import { NextRequest, NextResponse } from "next/server";

const API_BASE = (process.env.API_URL ?? "http://localhost:8000").replace(/\/$/, "");

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
]);

/** Stripped from proxied responses — fetch() already decompresses the body. */
const STRIP_FROM_RESPONSE = new Set(["content-encoding"]);

export async function proxyToBackend(request: NextRequest, pathSegments: string[]) {
  const path = pathSegments.join("/");
  const target = new URL(`${API_BASE}/api/v1/${path}`);
  target.search = request.nextUrl.search;

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP.has(lower) || lower === "accept-encoding") {
      return;
    }
    headers.set(key, value);
  });
  headers.set("Accept-Encoding", "identity");
  const forwardedHost =
    request.headers.get("x-forwarded-host") || request.nextUrl.host;
  const forwardedProto =
    (request.headers.get("x-forwarded-proto") || request.nextUrl.protocol.replace(":", "") || "https").split(",")[0];
  headers.set("x-forwarded-host", forwardedHost);
  headers.set("x-forwarded-proto", forwardedProto);

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
    cache: "no-store",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  const upstream = await fetch(target, init);
  const responseHeaders = new Headers();
  upstream.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP.has(lower) || STRIP_FROM_RESPONSE.has(lower)) {
      return;
    }
    responseHeaders.set(key, value);
  });
  responseHeaders.set("Cache-Control", "no-store, no-cache, must-revalidate");

  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}
