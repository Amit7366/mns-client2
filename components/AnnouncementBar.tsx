"use client";

import { absoluteUrl, BKBAJI_ANDROID_APP_PATH } from "@/lib/seo/site-config";
import { useLocale } from "./LocaleProvider";

const ANNOUNCEMENT_DOWNLOAD_URL = absoluteUrl(BKBAJI_ANDROID_APP_PATH);

function AnnouncementText({ text }: { text: string }) {
  const linkIndex = text.indexOf(ANNOUNCEMENT_DOWNLOAD_URL);
  if (linkIndex === -1) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {text.slice(0, linkIndex)}
      <a
        href={BKBAJI_ANDROID_APP_PATH}
        download
        className="pointer-events-auto font-semibold text-[#ffc44d] underline decoration-[#ffc44d]/50 underline-offset-2 transition-colors hover:text-[#ffe08a] hover:decoration-[#ffe08a]"
      >
        {ANNOUNCEMENT_DOWNLOAD_URL}
      </a>
      {text.slice(linkIndex + ANNOUNCEMENT_DOWNLOAD_URL.length)}
    </span>
  );
}

export default function AnnouncementBar() {
  const { t } = useLocale();
  const text = t.home.announcement;
  const items = Array.from({ length: 4 }, () => text);

  return (
    <section className="w-full pt-2" aria-label={text}>
      <div className="flex h-7 items-center gap-2 rounded-full border border-[#1f6f6f] bg-[#071a1c] px-2 shadow-[0_4px_16px_rgba(0,0,0,0.45),0_0_0_1px_rgba(56,160,160,0.18),inset_0_1px_0_rgba(255,255,255,0.06)] sm:h-9 sm:px-3">
        <span className="shrink-0 text-[13px] leading-none sm:text-[14px]" aria-hidden>
          📣
        </span>

        <div className="announcement-marquee relative min-w-0 flex-1 overflow-hidden">
          <div className="announcement-track flex w-max will-change-transform">
            <div className="flex shrink-0 items-center gap-8 pr-8">
              {items.map((item, index) => (
                <span
                  key={`a-${index}`}
                  className="whitespace-nowrap text-[11px] font-semibold text-[#f0b429] sm:text-[12px]"
                >
                  <AnnouncementText text={item} />
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden>
              {items.map((item, index) => (
                <span
                  key={`b-${index}`}
                  className="whitespace-nowrap text-[11px] font-semibold text-[#f0b429] sm:text-[12px]"
                >
                  <AnnouncementText text={item} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
