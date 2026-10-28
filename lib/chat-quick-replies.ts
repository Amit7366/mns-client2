import type { ApiResponse } from "@/lib/api/types";
import type { Locale } from "@/lib/locale";

export type LocalizedText = {
  en: string;
  bn: string;
  hi: string;
};

export type ChatQuickReplyIcon = "account" | "deposit" | "withdrawal" | "game" | "bonus";

export type ChatQuickReply = {
  _id: string;
  slug: string;
  label: LocalizedText;
  answer: LocalizedText;
  icon: ChatQuickReplyIcon;
  sortOrder: number;
};

export function localizedText(text: LocalizedText, locale: Locale): string {
  return text[locale]?.trim() || text.en;
}

export async function fetchChatQuickReplies(): Promise<ChatQuickReply[]> {
  const res = await fetch("/api/v1/chat-quick-replies", { cache: "no-store" });
  const body = (await res.json()) as ApiResponse<ChatQuickReply[]>;
  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to load suggestions");
  }
  return body.data ?? [];
}
