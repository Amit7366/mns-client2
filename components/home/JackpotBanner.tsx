"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import GameCard from "@/components/games/GameCard";
import { useLocale } from "@/components/LocaleProvider";
import type { GameTile } from "@/lib/game-tile";

const BASE = 493_272_212;
const CARD_SLOTS = 6;

function DigitReel({ digit }: { digit: string }) {
  const d = Number.parseInt(digit, 10);
  const offset = Number.isFinite(d) ? d : 0;

  return (
    <span className="relative inline-flex h-7 w-[13px] overflow-hidden rounded-[4px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.35)] sm:h-10 sm:w-[21px] sm:rounded-[5px] lg:h-11 lg:w-[24px]">
      <span
        className="absolute inset-x-0 top-0 w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateY(-${offset * 10}%)` }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className="flex h-7 w-full items-center justify-center text-[11px] font-black leading-none text-black sm:h-10 sm:text-[17px] lg:h-11 lg:text-[19px]"
          >
            {i}
          </span>
        ))}
      </span>
    </span>
  );
}

function CurrencyTile() {
  return (
    <span className="inline-flex h-7 w-[13px] items-center justify-center rounded-[4px] bg-white text-[11px] font-black text-black shadow-[0_1px_2px_rgba(0,0,0,0.35)] sm:h-10 sm:w-[21px] sm:rounded-[5px] sm:text-[16px] lg:h-11 lg:w-[24px] lg:text-[18px]">
      ৳
    </span>
  );
}

function JackpotCounter({ value }: { value: number }) {
  const formatted = Math.floor(value).toLocaleString("en-US");

  return (
    <div className="flex max-w-full items-center gap-[2px] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-1">
      <CurrencyTile />
      {formatted.split("").map((ch, index) =>
        ch === "," ? (
          <span
            key={`c-${index}`}
            className="px-[1px] text-[10px] font-black text-[#f5b429] sm:text-[16px] lg:text-[18px]"
          >
            ,
          </span>
        ) : (
          <DigitReel key={`d-${index}-${formatted.length}`} digit={ch} />
        ),
      )}
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="flex aspect-[3/4] w-[72px] shrink-0 items-center justify-center rounded-lg bg-[#c8c8c8] sm:w-[82px] lg:w-[72px]">
      <span className="h-6 w-6 animate-spin rounded-full border-[3px] border-white border-t-transparent" />
    </div>
  );
}

export default function JackpotBanner({ games = [] }: { games?: GameTile[] }) {
  const { t } = useLocale();
  const [value, setValue] = useState(BASE);
  const visible = games.slice(0, CARD_SLOTS);
  const placeholders = Math.max(0, CARD_SLOTS - visible.length);

  useEffect(() => {
    const id = window.setInterval(() => {
      setValue((v) => v + Math.floor(Math.random() * 9) + 1);
    }, 120);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="my-3 overflow-hidden rounded-[12px] bg-[#0a252b] sm:my-4 sm:rounded-[14px]">
      <div className="flex flex-col gap-3 p-2.5 sm:p-3 lg:flex-row lg:items-center lg:gap-4 lg:p-3.5">
        <div className="relative min-h-[100px] overflow-hidden rounded-xl sm:min-h-[132px] lg:min-h-[148px] lg:w-[48%] lg:shrink-0">
          <Image
            src="/jackpot-planes.png"
            alt=""
            fill
            unoptimized
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover object-left"
          />
          <div className="relative z-10 flex h-full min-h-[100px] flex-col items-center justify-center gap-1.5 py-3 pl-[28%] pr-2 sm:min-h-[132px] sm:items-start sm:gap-2 sm:py-4 sm:pl-[34%] sm:pr-3 lg:min-h-[148px]">
            <h2
              className="text-[22px] font-black leading-none tracking-wide sm:text-[34px] lg:text-[40px]"
              style={{
                backgroundImage: "linear-gradient(180deg, #ffe566 0%, #f5c518 42%, #e08a10 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "none",
                filter:
                  "drop-shadow(0 2px 0 #5a2a00) drop-shadow(0 3px 6px rgba(0,0,0,0.45))",
              }}
            >
              {t.home.jackpotLabel}
            </h2>
            <JackpotCounter value={value} />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2.5">
          {visible.map((game) => (
            <GameCard
              key={game.id}
              image={game.image ?? ""}
              gameId={game.id}
              gameCode={game.gameCode}
              title={game.title}
              provider={game.providerLabel}
              sizes="90px"
              className="w-[72px] shrink-0 sm:w-[82px] lg:w-[72px]"
            />
          ))}
          {Array.from({ length: placeholders }, (_, i) => (
            <LoadingCard key={`ph-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
