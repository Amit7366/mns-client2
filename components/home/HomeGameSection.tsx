"use client";

import Link from "next/link";
import GameCard from "@/components/games/GameCard";
import { useLocale } from "@/components/LocaleProvider";
import type { GameTile } from "@/lib/game-tile";

type HomeGameSectionProps = {
  title: string;
  seeAllHref: string;
  games: GameTile[];
  ribbon?: "hot" | "new";
  limit?: number;
};

export default function HomeGameSection({
  title,
  seeAllHref,
  games,
  ribbon,
  limit = 10,
}: HomeGameSectionProps) {
  const { t } = useLocale();
  const tiles = games.slice(0, limit);

  if (tiles.length === 0) return null;

  return (
    <section className="w-full py-2.5 sm:py-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="section-title-gold">{title}</h2>
        <Link
          href={seeAllHref}
          className="focus-ring text-[12px] font-medium text-[var(--cyan)] transition-colors hover:text-[var(--gold)] sm:text-[13px]"
        >
          {t.home.seeAll}
        </Link>
      </div>
      <div className="home-game-grid">
        {tiles.map((game, index) => (
          <div key={game.id} className="relative">
            {ribbon && index < 3 ? (
              <span
                className={`absolute -right-0.5 -top-0.5 z-10 rounded-bl-md rounded-tr-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#1a1400] ${
                  ribbon === "hot" ? "bg-[var(--gold)]" : "bg-[var(--cyan)]"
                }`}
              >
                {ribbon}
              </span>
            ) : null}
            <GameCard
              image={game.image ?? ""}
              gameId={game.id}
              gameCode={game.gameCode}
              title={game.title}
              provider={game.providerLabel}
              priority={index < 5}
              sizes="(max-width: 640px) 20vw, (max-width: 1023px) 16vw, 10vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
