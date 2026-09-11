import type { Metadata } from "next";
import type { Locale } from "@/lib/locale";
import {
  SITE_BRAND,
  SITE_CONTACT_EMAIL,
  SITE_DEFAULT_LOCALE,
  SITE_OG_IMAGE,
  SITE_SOCIAL,
  SITE_TAGLINE,
  SITE_URL,
  absoluteUrl,
  localePath,
} from "./site-config";

type HomeSeoCopy = {
  title: string;
  description: string;
  keywords: string[];
  ogLocale: string;
};

const HOME_SEO: Record<Locale, HomeSeoCopy> = {
  en: {
    title: `${SITE_BRAND} — ${SITE_TAGLINE} | Slots, Casino & Live Sports`,
    description:
      "Join BB666.site for high-energy slots, table casino, live games and live sports. Bet football, basketball, tennis and cricket in-play — fast, secure action. Play big, win bigger.",
    keywords: [
      "BB666.site",
      "BB666",
      "play big win bigger",
      "slots online",
      "live casino games",
      "live sports betting",
      "football betting",
      "basketball betting",
      "tennis betting",
      "cricket live betting",
      "fast secure casino",
      "live games",
      "in-play sports",
      "BB666 slots",
      "BB666 sports",
    ],
    ogLocale: "en_BD",
  },
  bn: {
    title: `${SITE_BRAND} — বড় খেলুন, আরও বড় জিতুন | স্লট, ক্যাসিনো ও লাইভ স্পোর্টস`,
    description:
      "BB666.site-এ স্লট, টেবিল ক্যাসিনো, লাইভ গেম ও লাইভ স্পোর্টসে যোগ দিন। ফুটবল, বাস্কেটবল, টেনিস ও ক্রিকেট লাইভ বেটিং — দ্রুত ও নিরাপদ। Play Big, Win Bigger.",
    keywords: [
      "BB666.site",
      "BB666",
      "বড় খেলুন আরও বড় জিতুন",
      "স্লট গেম",
      "লাইভ ক্যাসিনো",
      "লাইভ স্পোর্টস",
      "ফুটবল বেটিং",
      "বাস্কেটবল বেটিং",
      "টেনিস বেটিং",
      "ক্রিকেট লাইভ বেটিং",
      "দ্রুত নিরাপদ ক্যাসিনো",
      "লাইভ গেম",
      "ইন-প্লে স্পোর্টস",
      "BB666 স্লট",
      "BB666 স্পোর্টস",
    ],
    ogLocale: "bn_BD",
  },
  hi: {
    title: `${SITE_BRAND} — बड़ा खेलें, और बड़ा जीतें | स्लॉट, कैसीनो और लाइव स्पोर्ट्स`,
    description:
      "BB666.site पर स्लॉट, टेबल कैसीनो, लाइव गेम्स और लाइव स्पोर्ट्स खेलें। फुटबॉल, बास्केटबॉल, टेनिस और क्रिकेट लाइव बेटिंग — तेज़ और सुरक्षित। Play Big, Win Bigger.",
    keywords: [
      "BB666.site",
      "BB666",
      "play big win bigger",
      "स्लॉट गेम",
      "लाइव कैसीनो",
      "लाइव स्पोर्ट्स",
      "फुटबॉल बेटिंग",
      "बास्केटबॉल बेटिंग",
      "टेनिस बेटिंग",
      "क्रिकेट लाइव बेटिंग",
      "तेज़ सुरक्षित कैसीनो",
      "लाइव गेम्स",
      "इन-प्ले स्पोर्ट्स",
      "BB666 स्लॉट",
      "BB666 स्पोर्ट्स",
    ],
    ogLocale: "hi_BD",
  },
};

export function getHomeSeoCopy(locale: Locale): HomeSeoCopy {
  return HOME_SEO[locale] ?? HOME_SEO[SITE_DEFAULT_LOCALE];
}

export function buildHomeMetadata(locale: Locale): Metadata {
  const seo = getHomeSeoCopy(locale);
  const pageUrl = absoluteUrl(localePath(locale));

  return {
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: SITE_BRAND, url: SITE_URL }],
    creator: SITE_BRAND,
    publisher: SITE_BRAND,
    applicationName: SITE_BRAND,
    category: "entertainment",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: pageUrl,
      languages: {
        en: absoluteUrl(localePath("en")),
        bn: absoluteUrl(localePath("bn")),
        hi: absoluteUrl(localePath("hi")),
        "x-default": absoluteUrl(localePath(SITE_DEFAULT_LOCALE)),
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: seo.ogLocale,
      alternateLocale: ["en_BD", "bn_BD", "hi_BD"].filter((l) => l !== seo.ogLocale),
      url: pageUrl,
      siteName: SITE_BRAND,
      title: seo.title,
      description: seo.description,
      images: [SITE_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_SOCIAL.twitter,
      creator: SITE_SOCIAL.twitter,
      title: seo.title,
      description: seo.description,
      images: {
        url: SITE_OG_IMAGE.url,
        alt: SITE_OG_IMAGE.alt,
      },
    },
    other: {
      "content-language": locale,
      "geo.region": "BD",
      "geo.placename": "Bangladesh",
      contact: SITE_CONTACT_EMAIL,
    },
  };
}
