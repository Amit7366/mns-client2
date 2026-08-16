"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useLocale } from "@/components/LocaleProvider";
import { memberLiveChatHref } from "@/lib/member-routes";
import { socialLinks } from "@/lib/footer-social-data";

const FLOAT_SOCIAL_IDS = ["facebook", "telegram", "whatsapp"] as const;

function SocialGlyph({ id }: { id: string }) {
  if (id === "facebook") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v7h4v-7h3.2l.8-4H13V9c0-.6.4-1 1-1z" />
      </svg>
    );
  }
  if (id === "telegram") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M21.5 3.3L2.8 10.8c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.7.1.9.8.9.5 0 .7-.2 1-.6l2.7-3.6 5.6 4.1c1 .6 1.8.3 2-.9l3.7-17.4c.3-1.4-.5-2-1.5-1.5z" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.5 14.2c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.1-.3.2-.6.1-1.5-.5-2.8-1.4-3.8-2.8-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4 1.4.5 1.9.6 2.6.5.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18.2c-4.5 0-8.2-3.7-8.2-8.2S7.5 3.8 12 3.8s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2z" />
    </svg>
  );
}

export default function FloatingSocialStack() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { t, preferences } = useLocale();
  const label = t.sub.liveChat;

  function goLiveChat() {
    const href = memberLiveChatHref(preferences.locale);
    if (!isAuthenticated) {
      router.push(`/${preferences.locale}/login?next=${encodeURIComponent(href)}`);
      return;
    }
    router.push(href);
  }

  const floatItems = FLOAT_SOCIAL_IDS.map((id) => {
    const meta = socialLinks.find((s) => s.id === id);
    return { id, color: meta?.color ?? "#00e5ff", label: meta?.label ?? id };
  });

  return (
    <div className="fixed bottom-[calc(3.5rem+env(safe-area-inset-bottom)+0.75rem)] right-2 z-40 flex flex-col items-center gap-2 lg:bottom-6 lg:right-4">
      {floatItems.map((item) => (
        <a
          key={item.id}
          href="#"
          aria-label={item.id}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: item.color }}
        >
          <SocialGlyph id={item.id} />
        </a>
      ))}
      <button
        type="button"
        onClick={goLiveChat}
        aria-label={label}
        className="flex flex-col items-center gap-0.5 transition-transform hover:scale-105 active:scale-95"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--cyan)] shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
          <Image
            src="/live-chat.png"
            alt=""
            width={22}
            height={22}
            className="h-[22px] w-[22px] object-contain"
            priority
          />
        </span>
        <span className="max-w-[4.5rem] text-center text-[9px] font-semibold leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {label}
        </span>
      </button>
    </div>
  );
}
