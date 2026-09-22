import type { Locale } from "@/lib/locale";

export type BottomNavMessages = {
  home: string;
  promotion: string;
  invite: string;
  reward: string;
  member: string;
};

const en: BottomNavMessages = {
  home: "Home",
  promotion: "Promotion",
  invite: "Invite",
  reward: "Reward",
  member: "Member",
};

const bn: BottomNavMessages = {
  home: "হোম",
  promotion: "প্রমোশন",
  invite: "ইনভাইট",
  reward: "রিওয়ার্ড",
  member: "মেম্বার",
};

const hi: BottomNavMessages = {
  home: "होम",
  promotion: "प्रमोशन",
  invite: "इनवाइट",
  reward: "रिवॉर्ड",
  member: "सदस्य",
};

export function getBottomNavMessages(locale: Locale): BottomNavMessages {
  if (locale === "bn") return bn;
  if (locale === "hi") return hi;
  return en;
}
