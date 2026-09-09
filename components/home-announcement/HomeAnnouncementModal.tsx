"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { getHomeAnnouncementMessages } from "@/lib/i18n/home-announcement-messages";
import {
  HOME_ANNOUNCEMENT_TABS,
  type HomeAnnouncementTab,
} from "@/lib/home-announcement-data";
import { memberDepositHref, memberRewardCenterHref } from "@/lib/member-routes";
import { lobbyCategoryHref } from "@/lib/vendor-routes";

type HomeAnnouncementModalProps = {
  open: boolean;
  onClose: () => void;
};

function StarIcon({ active }: { active: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="mt-0.5 shrink-0">
      <path
        d="M7 1.15l1.62 3.28 3.62.53-2.62 2.55.62 3.6L7 9.48 3.76 11.11l.62-3.6L1.76 4.96l3.62-.53L7 1.15z"
        fill="#c62828"
        stroke={active ? "#9b1b1b" : "#f5c518"}
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function goHref(tab: HomeAnnouncementTab, locale: string): string | null {
  if (tab.go === "deposit") return memberDepositHref(locale);
  if (tab.go === "reward") return memberRewardCenterHref(locale);
  if (tab.go === "referral") return `/${locale}/referral`;
  if (tab.go === "slot") return lobbyCategoryHref(locale, "slot");
  return null;
}

export default function HomeAnnouncementModal({ open, onClose }: HomeAnnouncementModalProps) {
  const router = useRouter();
  const { preferences } = useLocale();
  const locale = preferences.locale;
  const m = getHomeAnnouncementMessages(locale);
  const [activeId, setActiveId] = useState(HOME_ANNOUNCEMENT_TABS[0].id);

  const tab = HOME_ANNOUNCEMENT_TABS.find((item) => item.id === activeId) ?? HOME_ANNOUNCEMENT_TABS[0];
  const heading = m.headings[tab.id];

  useEffect(() => {
    if (open) setActiveId(HOME_ANNOUNCEMENT_TABS[0].id);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  function handleGo() {
    const href = goHref(tab, locale);
    onClose();
    if (href) router.push(href);
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4">
      <button type="button" className="absolute inset-0" aria-label={m.close} onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="home-announcement-title"
        className="relative z-10 flex h-[min(92dvh,820px)] w-full max-w-[960px] flex-col overflow-hidden rounded-t-2xl border border-[#2a8a7a] bg-[#053836] shadow-[0_16px_60px_rgba(0,0,0,0.55)] sm:h-[min(90vh,820px)] sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 px-3 py-2.5 sm:px-5 sm:py-3">
          <h2
            id="home-announcement-title"
            className="text-[17px] font-extrabold text-[#f5c518] sm:text-[20px]"
          >
            {m.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={m.close}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-[#f5c518] text-[#1a1400] sm:h-8 sm:w-8"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2 px-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:gap-3 sm:px-4 sm:pb-4 lg:flex-row">
          <div className="flex shrink-0 gap-2 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:w-[248px] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0 [&::-webkit-scrollbar]:hidden">
            {HOME_ANNOUNCEMENT_TABS.map((item) => {
              const active = item.id === tab.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`focus-ring flex min-h-11 min-w-[9.75rem] items-start gap-2 rounded-lg border px-2 py-1.5 text-left text-[11px] font-semibold leading-snug sm:min-w-[15.5rem] sm:px-2.5 sm:py-2 sm:text-[13px] lg:min-h-[58px] lg:min-w-0 lg:w-full ${
                    active
                      ? "border-[#f5c518] bg-[#f5c518] text-[#b71c1c]"
                      : "border-[#2a8a7a] bg-[#042c2c] text-white"
                  }`}
                >
                  <StarIcon active={active} />
                  <span>{m.tabs[item.id]}</span>
                </button>
              );
            })}
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#2a8a7a] bg-[#032826]">
            <div className="announcement-scroll min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-2.5 py-2.5 sm:px-4 sm:py-3">
              <p className="text-[12px] font-semibold text-[#7ef0d4] sm:text-[15px]">{heading.title}</p>
              {heading.subtitle ? (
                <p className="mt-1 text-[11px] text-[#8eead4] sm:text-[13px]">{heading.subtitle}</p>
              ) : null}

              <div
                className={`mt-3 grid gap-3 ${
                  tab.images.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
                }`}
              >
                {tab.images.map((src) => (
                  <div key={src} className="overflow-hidden rounded-lg bg-black/20">
                    <Image
                      src={src}
                      alt={heading.title}
                      width={1200}
                      height={700}
                      unoptimized
                      className="h-auto w-full object-contain"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-lg bg-white/95 px-2.5 py-2.5 sm:px-4 sm:py-3">
                <p className="text-[12px] font-extrabold leading-snug text-[#d4a017] sm:text-[14px]">
                  {heading.highlight}
                </p>
                <div className="mt-2 space-y-2">
                  {heading.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[11px] leading-relaxed text-[#1a1400] sm:text-[13px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {heading.note ? (
                  <p className="mt-2 text-[11px] font-semibold leading-relaxed text-[#c62828] sm:text-[13px]">
                    {heading.note}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex shrink-0 justify-end border-t border-[#2a8a7a]/50 px-2.5 py-2 sm:px-4 sm:py-2.5">
              <button
                type="button"
                onClick={handleGo}
                className="focus-ring min-h-11 w-full rounded-lg bg-[#f5c518] px-6 text-[14px] font-extrabold text-[#1a1400] shadow-[0_2px_8px_rgba(0,0,0,0.3)] sm:min-h-10 sm:w-auto sm:min-w-[6.5rem]"
              >
                {m.go}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
