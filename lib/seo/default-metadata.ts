import type { Metadata } from "next";
import {
  SITE_BRAND,
  SITE_CONTACT_EMAIL,
  SITE_ICONS,
  SITE_OG_IMAGE,
  SITE_SHORT_NAME,
  SITE_SOCIAL,
  SITE_TAGLINE,
  SITE_URL,
} from "./site-config";

export const defaultSiteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_BRAND} — ${SITE_TAGLINE} | Slots, Casino & Live Sports`,
    template: `%s | ${SITE_BRAND}`,
  },
  description:
    "BB666.site is a fast, secure playground for slots, casino tables, live games and live sports. Football, basketball, tennis, cricket and in-play betting — play big, win bigger.",
  applicationName: SITE_BRAND,
  authors: [{ name: SITE_BRAND, url: SITE_URL }],
  creator: SITE_BRAND,
  publisher: SITE_BRAND,
  category: "entertainment",
  keywords: [
    "BB666.site",
    "BB666",
    "play big win bigger",
    "slots",
    "live casino",
    "live sports",
    "live games",
    "football betting",
    "cricket betting",
  ],
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: SITE_ICONS.favicon, type: "image/png" }],
    shortcut: SITE_ICONS.favicon,
    apple: [{ url: SITE_ICONS.appleTouchIcon, sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_SHORT_NAME,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: SITE_BRAND,
    title: `${SITE_BRAND} — ${SITE_TAGLINE}`,
    description:
      "Slots, casino, live games and live sports at BB666.site. Fast & secure. Play big, win bigger.",
    locale: "bn_BD",
    alternateLocale: ["en_BD", "hi_BD"],
    url: SITE_URL,
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_SOCIAL.twitter,
    creator: SITE_SOCIAL.twitter,
    title: `${SITE_BRAND} — ${SITE_TAGLINE}`,
    description:
      "Slots, casino, live games and live sports at BB666.site. Fast & secure. Play big, win bigger.",
    images: {
      url: SITE_OG_IMAGE.url,
      alt: SITE_OG_IMAGE.alt,
    },
  },
  other: {
    contact: SITE_CONTACT_EMAIL,
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
  },
};
