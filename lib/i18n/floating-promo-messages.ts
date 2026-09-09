import type { Locale } from "@/lib/locale";

export type FloatingPromoMessages = {
  collapse: string;
  expand: string;
  close: string;
  egg: string;
  wheel: string;
  prize: string;
  card: string;
};

const en: FloatingPromoMessages = {
  collapse: "Collapse bonuses",
  expand: "Expand bonuses",
  close: "Hide bonuses",
  egg: "Lucky egg",
  wheel: "Lucky wheel",
  prize: "Reward center",
  card: "Red envelope",
};

const bn: FloatingPromoMessages = {
  collapse: "বোনাস ভাঁজ করুন",
  expand: "বোনাস খুলুন",
  close: "বোনাস লুকান",
  egg: "লাকি এগ",
  wheel: "লাকি হুইল",
  prize: "রিওয়ার্ড সেন্টার",
  card: "লাল খাম",
};

const hi: FloatingPromoMessages = {
  collapse: "बोनस समेटें",
  expand: "बोनस खोलें",
  close: "बोनस छिपाएँ",
  egg: "लकी एग",
  wheel: "लकी व्हील",
  prize: "रिवॉर्ड सेंटर",
  card: "लाल लिफाफा",
};

export function getFloatingPromoMessages(locale: Locale): FloatingPromoMessages {
  if (locale === "bn") return bn;
  if (locale === "hi") return hi;
  return en;
}
