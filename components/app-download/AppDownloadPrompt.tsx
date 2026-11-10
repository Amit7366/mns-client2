"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/components/LocaleProvider";
import { usePwaInstall } from "@/lib/use-pwa-install";
import { SITE_ICONS } from "@/lib/seo/site-config";
import { getAppDownloadBarMessages } from "@/lib/i18n/app-download-bar-messages";

type AppDownloadPromptProps = {
  onClose: () => void;
};

function Star() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
      <path
        d="M6 1.1l1.35 2.74 3.02.44-2.18 2.13.51 3-.7-1.7L6 8.84 3.3 10.71l.51-3L1.63 4.28l3.02-.44L6 1.1z"
        fill="#f08a10"
        stroke="#d97800"
        strokeWidth="0.4"
      />
    </svg>
  );
}

function isIosBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export default function AppDownloadPrompt({ onClose }: AppDownloadPromptProps) {
  const { preferences } = useLocale();
  const { canInstall, install } = usePwaInstall();
  const m = getAppDownloadBarMessages(preferences.locale);
  const [helpOpen, setHelpOpen] = useState(false);

  async function handleDownload() {
    if (!canInstall) {
      setHelpOpen(true);
      return;
    }
    const accepted = await install();
    if (accepted) onClose();
  }

  async function handleInstallFromHelp() {
    const accepted = await install();
    if (accepted) {
      setHelpOpen(false);
      onClose();
    }
  }

  return (
    <>
    <div
      role="banner"
      aria-label={m.headline}
      className="app-download-top-bar relative z-[51] w-full shrink-0 lg:hidden"
      style={{
        backgroundImage: "linear-gradient(180deg, #ffe566 0%, #f5c518 48%, #e8b400 100%)",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div className="flex h-[54px] items-center gap-2 px-2.5">
        <div className="relative shrink-0">
          <Image
            src={SITE_ICONS.pwa192}
            alt=""
            width={42}
            height={42}
            className="h-[42px] w-[42px] rounded-full border-[2px] border-[#f0b429] object-cover shadow-[0_1px_4px_rgba(0,0,0,0.25)]"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-extrabold leading-none tracking-wide text-[#b71c1c]">
            {m.headline}
          </p>
          <div className="mt-1 flex items-center gap-0.5" aria-hidden>
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
        </div>

        <button
          type="button"
          onClick={() => void handleDownload()}
          className="focus-ring shrink-0 rounded-lg px-3.5 py-1.5 text-[13px] font-extrabold leading-none"
          style={{
            color: "#8a3f14",
            textShadow: "0 1px 0 rgba(255, 236, 160, 0.55)",
            backgroundImage: "linear-gradient(180deg, #fff3a8 0%, #ffd24a 48%, #f0b01e 100%)",
            border: "1px solid #f5c44a",
            boxShadow: "inset 0 1px 0 #fff8d0, inset 0 -2px 0 #d49212, 0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          {m.download}
        </button>

        <button
          type="button"
          onClick={onClose}
          aria-label={m.close}
          className="focus-ring flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f0c020] text-[#5c4300] shadow-[0_1px_3px_rgba(0,0,0,0.25)]"
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
    {helpOpen ? (
      <div
        className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 px-4 pb-6 sm:items-center"
        role="presentation"
        onClick={() => setHelpOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={m.installTitle}
          className="w-full max-w-sm rounded-2xl bg-white px-5 py-5 text-center shadow-xl"
          onClick={(event) => event.stopPropagation()}
        >
          <p className="text-[17px] font-bold text-[#1a1a1a]">{m.installTitle}</p>
          {canInstall ? (
            <button
              type="button"
              onClick={() => void handleInstallFromHelp()}
              className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-[#01875f] px-8 text-[15px] font-semibold text-white"
            >
              {m.installNow}
            </button>
          ) : (
            <p className="mt-3 text-[14px] leading-6 text-[#3c4043]">
              {isIosBrowser() ? m.iosHint : m.browserHint}
            </p>
          )}
          <button
            type="button"
            onClick={() => setHelpOpen(false)}
            className="mt-4 text-[13px] font-semibold text-[#5f6368]"
          >
            {m.close}
          </button>
        </div>
      </div>
    ) : null}
    </>
  );
}
