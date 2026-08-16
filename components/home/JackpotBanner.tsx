"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

const BASE = 6_405_675_164;

function formatJackpot(n: number): string {
  return Math.floor(n).toLocaleString("en-US");
}

export default function JackpotBanner() {
  const { t } = useLocale();
  const [value, setValue] = useState(BASE);

  useEffect(() => {
    const id = window.setInterval(() => {
      setValue((v) => v + Math.floor(Math.random() * 37) + 3);
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="my-4 overflow-hidden rounded-xl border border-[var(--gold)]/35 bg-gradient-to-r from-[#012820] via-[#0a4a28] to-[#013528] px-4 py-4 sm:px-6">
      <div className="flex flex-col items-center justify-center gap-1 text-center sm:flex-row sm:gap-4">
        <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--gold)] sm:text-[13px]">
          {t.home.jackpotLabel}
        </span>
        <p className="animate-jackpot-glow font-mono text-[28px] font-bold tabular-nums tracking-wide text-[var(--gold-bright)] sm:text-[36px] lg:text-[42px]">
          {formatJackpot(value)}
        </p>
      </div>
    </section>
  );
}
