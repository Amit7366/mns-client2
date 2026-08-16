"use client";

import Link from "next/link";
import { getVipMessages, VIP_BENEFIT_IDS } from "@/lib/i18n/vip-messages";
import { useLocale } from "@/components/LocaleProvider";
import VipBenefitIcon from "./VipBenefitIcon";
import VipHeroArt from "./VipHeroArt";

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M12.5 4.5L7 10l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function VipDetailsPageContent() {
  const { preferences } = useLocale();
  const v = getVipMessages(preferences.locale);
  const base = `/${preferences.locale}`;

  return (
    <div className="min-h-full bg-[var(--bg)]">
      <header className="sticky top-0 z-30 border-b border-[#1f1f1f] bg-[var(--bg)]/95 backdrop-blur-sm">
        <div className="flex h-[48px] items-center gap-2 px-3 sm:px-4 lg:px-6">
          <Link
            href={base}
            className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10"
            aria-label={v.back}
          >
            <BackIcon />
          </Link>
          <h1 className="text-[16px] font-semibold text-white sm:text-[17px]">{v.pageTitle}</h1>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[var(--bg)] via-[#0d2818] to-[var(--gold)] p-4 sm:rounded-2xl sm:p-5 lg:p-6">
          <div
            className="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-[#22c55e]/20 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-[#f5c518]/10 blur-2xl"
            aria-hidden
          />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl lg:text-[26px]">
                {v.heroTitle}
              </h2>
              <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/85 sm:text-[14px]">
                {v.heroSubtitle}
              </p>
              <button
                type="button"
                className="focus-ring mt-4 rounded-full bg-gradient-to-r from-[#ffe566] via-[#f5c518] to-[#e5a800] px-6 py-2.5 text-[14px] font-bold text-[var(--surface)] shadow-[0_4px_16px_rgba(245,197,24,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {v.joinNow}
              </button>
            </div>
            <VipHeroArt />
          </div>
        </section>

        <section className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:gap-4 md:grid-cols-2">
          {VIP_BENEFIT_IDS.map((id) => {
            const benefit = v.benefits[id];
            return (
              <article
                key={id}
                className="flex gap-3 rounded-xl bg-[#252525] p-3.5 sm:gap-4 sm:p-4"
              >
                <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center sm:h-20 sm:w-20">
                  <VipBenefitIcon id={id} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[14px] font-bold leading-snug text-white sm:text-[15px]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#b3b3b3] sm:text-[13px]">
                    {benefit.description}
                  </p>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}
