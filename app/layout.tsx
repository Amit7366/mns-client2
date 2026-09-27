import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { isValidLocale, type Locale } from "@/lib/locale";
import DisablePinchZoom from "@/components/DisablePinchZoom";
import { localeFontClass } from "@/lib/locale-font";
import { defaultSiteMetadata } from "@/lib/seo/default-metadata";
import "./globals.css";

const FONT_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap";

export const metadata: Metadata = defaultSiteMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00332B" },
    { media: "(prefers-color-scheme: dark)", color: "#00332B" },
  ],
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const localeHeader = headerList.get("x-locale");
  const locale: Locale =
    localeHeader && isValidLocale(localeHeader) ? localeHeader : "bn";

  return (
    <html lang={locale} suppressHydrationWarning className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONT_STYLESHEET} />
      </head>
      <body
        suppressHydrationWarning
        className={`flex h-dvh flex-col overflow-hidden bg-[var(--bg)] ${localeFontClass(locale)}`}
      >
        <DisablePinchZoom />
        {children}
      </body>
    </html>
  );
}
