"use client";

import { useEffect } from "react";
import { languagesForCountry, type Country } from "@/lib/locale";
import { useLocale } from "./LocaleProvider";

function BangladeshFlag({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden>
      <circle cx="28" cy="28" r="28" fill="#006a4e" />
      <circle cx="30" cy="28" r="16" fill="#f42a41" />
    </svg>
  );
}

function IndiaFlag({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden>
      <clipPath id="inClip">
        <circle cx="28" cy="28" r="28" />
      </clipPath>
      <g clipPath="url(#inClip)">
        <rect width="56" height="18.67" fill="#ff9933" />
        <rect y="18.67" width="56" height="18.67" fill="#ffffff" />
        <rect y="37.33" width="56" height="18.67" fill="#138808" />
        <circle cx="28" cy="28" r="5.5" stroke="#000080" strokeWidth="1.2" fill="none" />
      </g>
    </svg>
  );
}

function CountryPanel({
  country,
  currencyLabel,
  flag,
}: {
  country: Country;
  currencyLabel: string;
  flag: React.ReactNode;
}) {
  const { preferences, setPreferences } = useLocale();
  const languages = languagesForCountry(country);

  return (
    <div className="flex flex-1 flex-col items-center rounded-xl bg-[#242424] px-4 py-5">
      <div className="mb-3">{flag}</div>
      <p className="mb-4 text-[15px] font-medium text-white">{currencyLabel}</p>
      <div className="flex w-full flex-col gap-2">
        {languages.map((language) => {
          const active =
            preferences.country === country && preferences.locale === language.locale;

          return (
            <button
              key={`${country}-${language.locale}`}
              type="button"
              onClick={() => setPreferences(country, language.locale)}
              className={`h-10 w-full rounded-lg text-[14px] font-medium transition-colors ${
                active
                  ? "bg-[var(--gold)] text-white"
                  : "bg-[#333333] text-[#b8b8b8] hover:bg-[#3a3a3a]"
              }`}
            >
              {language.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CurrencyLanguageModal() {
  const { modalOpen, closeModal, t } = useLocale();

  useEffect(() => {
    if (!modalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen, closeModal]);

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog backdrop"
        onClick={closeModal}
        className="absolute inset-0 bg-black/70"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="currency-language-title"
        className="relative z-[101] w-full max-w-[560px] rounded-2xl bg-[var(--surface)] p-5 shadow-2xl sm:p-6"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="currency-language-title" className="text-[18px] font-medium text-white">
            {t.currencyLanguage}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={closeModal}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#d0d0d0] transition-colors hover:bg-[var(--border)] hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M2 2l10 10M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex gap-3">
          <CountryPanel country="bd" currencyLabel="৳ BDT" flag={<BangladeshFlag />} />
          <CountryPanel country="in" currencyLabel="₹ INR" flag={<IndiaFlag />} />
        </div>
      </div>
    </div>
  );
}
