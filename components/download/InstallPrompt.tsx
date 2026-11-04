"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePwaInstall } from "@/lib/use-pwa-install";

const PROGRESS_MS = 4200;

function FastInstallMark() {
  return (
    <svg width="52" height="52" viewBox="0 0 64 64" aria-hidden>
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="none"
        stroke="#4285F4"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="40 130"
        transform="rotate(148 32 32)"
      />
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="none"
        stroke="#FBBC05"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="36 130"
        transform="rotate(-18 32 32)"
      />
      <path d="M36 7.5 22.5 33.5h10.2L26 57.5 46.5 28.5H34.2L36 7.5z" fill="#34A853" />
      <path d="M36 7.5 27.2 23.8h7.4l-3.6 9.2L36 7.5z" fill="#EA4335" />
    </svg>
  );
}

function ProgressMark({ value }: { value: number }) {
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="relative mx-auto mt-8 h-[68px] w-[68px]">
      <svg className="absolute inset-0" viewBox="0 0 68 68" aria-hidden>
        <circle
          cx="34"
          cy="30"
          r={radius}
          fill="none"
          stroke="#202124"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(128 34 30)"
        />
      </svg>
      <p className="absolute inset-x-0 bottom-0 text-center text-[18px] leading-none tracking-tight text-[#202124]">
        {value}%
      </p>
    </div>
  );
}

export default function InstallPrompt({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const { canInstall, isStandalone, install } = usePwaInstall();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [manualHint, setManualHint] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    void navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  useEffect(() => {
    if (!open) return;
    const scroller = document.querySelector<HTMLElement>("[data-download-scroll]");
    if (!scroller) return;
    const previous = scroller.style.overflow;
    scroller.style.overflow = "hidden";
    return () => {
      scroller.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setProgress(0);
    setDone(false);
    setManualHint(false);
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / PROGRESS_MS);
      const eased = 1 - (1 - t) ** 2;
      const value = Math.min(100, Math.round(eased * 100));
      setProgress(value);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [open]);

  async function handleInstall() {
    if (isStandalone) {
      setOpen(false);
      return;
    }
    const accepted = await install();
    if (accepted) {
      setOpen(false);
      return;
    }
    if (!canInstall) setManualHint(true);
  }

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-5"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="দ্রুত ইনস্টল"
            className="w-full max-w-[22.5rem] rounded-[28px] bg-white px-6 pb-10 pt-8 text-center shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-center gap-2">
              <FastInstallMark />
              <p className="text-[28px] font-normal leading-none tracking-tight text-[#202124]">
                দ্রুত ইনস্টল
              </p>
            </div>

            <div className="mt-5">
              <span className="inline-flex rounded-[6px] border border-[#c8ccd0] px-3.5 py-[5px] text-[15px] leading-none text-[#5f6368]">
                6 গুণ দ্রুত
              </span>
            </div>

            <div className="mt-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#9dccb4] px-4 py-1.5 text-[17px] leading-none text-[#6eae90]">
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                  <circle cx="9" cy="9" r="8" fill="#7dbea2" />
                  <path
                    d="M5.2 9.2 7.6 11.6 12.8 6.4"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                সক্রিয় করা হয়েছে
              </span>
            </div>

            {done ? (
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => void handleInstall()}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#01875f] px-8 text-[16px] font-medium text-white"
                >
                  এখনই ইনস্টল করুন
                </button>
                {manualHint ? (
                  <p className="mx-auto mt-3 max-w-[16rem] text-xs leading-5 text-[#5f6368]">
                    ইনস্টল মেনু খুলতে ব্রাউজারের মেনু থেকে “হোম স্ক্রিনে যোগ করুন” ট্যাপ করুন।
                  </p>
                ) : null}
              </div>
            ) : (
              <ProgressMark value={progress} />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
