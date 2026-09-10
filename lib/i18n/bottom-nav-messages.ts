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
  home: "Home",
  promotion: "Promotion",
  invite: "Invite",
  reward: "Reward",
  member: "Member",
};

const hi: BottomNavMessages = {
  home: "Home",
  promotion: "Promotion",
  invite: "Invite",
  reward: "Reward",
  member: "Member",
};

export function getBottomNavMessages(locale: Locale): BottomNavMessages {
  if (locale === "bn") return bn;
  if (locale === "hi") return hi;
  return en;
}
