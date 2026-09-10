"use client";

import { useLocale } from "./LocaleProvider";

function BangladeshFlagIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="14" fill="#006a4e" />
      <circle cx="15.5" cy="14" r="8" fill="#f42a41" />
    </svg>
  );
}

function IndiaFlagIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <clipPath id="navInClip">
        <circle cx="14" cy="14" r="14" />
      </clipPath>
      <g clipPath="url(#navInClip)">
        <rect width="28" height="9.33" fill="#ff9933" />
        <rect y="9.33" width="28" height="9.34" fill="#ffffff" />
        <rect y="18.67" width="28" height="9.33" fill="#138808" />
        <circle cx="14" cy="14" r="2.8" stroke="#000080" strokeWidth="0.8" fill="none" />
      </g>
    </svg>
  );
}

export default function LocaleMenuButton() {
  const { preferences, openModal, t } = useLocale();

  return (
    <button
      type="button"
      aria-label={t.ui.changeLocale}
      onClick={openModal}
      className="focus-ring flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-80 sm:h-10 sm:w-10"
    >
      {preferences.country === "bd" ? <BangladeshFlagIcon /> : <IndiaFlagIcon />}
    </button>
  );
}
