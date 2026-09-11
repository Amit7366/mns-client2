"use client";

import Image from "next/image";
import TopNavbar from "@/components/TopNavbar";
import { AUTH_HERO_ALT, AUTH_HERO_IMAGE } from "@/lib/auth-hero-image";

type AuthShellProps = {
  mode: "login" | "register" | "forgot";
  children: React.ReactNode;
};

export default function AuthShell({ mode, children }: AuthShellProps) {
  const isCard = mode === "login" || mode === "register";

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[var(--bg)]">
      <TopNavbar variant="auth" />

      {isCard ? (
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 py-6">
          <Image
            src={AUTH_HERO_IMAGE}
            alt={AUTH_HERO_ALT}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#042a28]/72" />
          <div className="relative z-[1] w-full max-w-[400px]">{children}</div>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col px-5 py-8 sm:px-8">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
