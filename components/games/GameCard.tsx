"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { isValidGameImageUrl, normalizeGameImage } from "@/lib/vendor-games-data";
import { useLocale } from "@/components/LocaleProvider";
import { useGamePlayGate } from "./GamePlayGateProvider";

const goldActionStyle: React.CSSProperties = {
  color: "#8a3f14",
  textShadow: "0 1px 0 rgba(255, 236, 160, 0.55)",
  backgroundImage: "linear-gradient(180deg, #ffe98a 0%, #ffd24a 45%, #f0b01e 100%)",
  border: "1px solid #f5c44a",
  boxShadow:
    "inset 0 1px 0 #fff8d0, inset 0 -1px 0 #d49212, 0 2px 5px rgba(0, 0, 0, 0.45)",
};

function canHoverFine(): boolean {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function GameImagePlaceholder({ title }: { title?: string }) {
  const displayTitle = title?.trim() || "Game";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[var(--surface)] px-2 py-3 text-center">
      <p className="line-clamp-4 text-[10px] font-semibold leading-snug text-white sm:text-[11px] lg:text-xs">
        {displayTitle}
      </p>
    </div>
  );
}

export type GameCardProps = {
  image: string;
  /** Client-side game id shown in toast with title */
  gameId?: string;
  /** Provider game_code from server game data */
  gameCode?: string;
  title?: string;
  provider?: string;
  priority?: boolean;
  sizes?: string;
  onClick?: () => void;
  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  unoptimized?: boolean;
  ariaLabel?: string;
};

export default function GameCard(props: GameCardProps) {
  const { handleGameClick } = useGamePlayGate();
  const { t } = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);
  const [favorited, setFavorited] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const src = normalizeGameImage(props.image);
  const hasImage = isValidGameImageUrl(src);
  const displayTitle = props.title?.trim() ?? "";
  const providerLabel = props.provider?.trim() ?? "";
  const alt =
    props.title && props.provider ? `${props.title} — ${props.provider}` : "";
  const defaultClassName =
    "group relative block overflow-hidden rounded-lg bg-[var(--surface-card)] text-left shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.5)] lg:rounded-[12px] lg:shadow-[0_4px_16px_rgba(0,0,0,0.35)]";
  const rootClass = [
    defaultClassName,
    overlayOpen ? "is-game-card-active" : "",
    props.className,
  ]
    .filter(Boolean)
    .join(" ");

  function play() {
    handleGameClick({
      title: props.title,
      gameId: props.gameId,
      gameCode: props.gameCode,
      onAuthorized: props.onClick,
    });
  }

  function handleCardTap() {
    if (canHoverFine()) {
      play();
      return;
    }
    setOverlayOpen(true);
  }

  useEffect(() => {
    if (!overlayOpen) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setOverlayOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [overlayOpen]);

  const overlayShown = overlayOpen;

  return (
    <div ref={rootRef} className={rootClass}>
      <div className={`relative aspect-[3/4] w-full ${props.contentClassName ?? ""}`.trim()}>
        {hasImage ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={props.priority}
            sizes={props.sizes ?? "(max-width: 1023px) 20vw, 10vw"}
            className={`object-fill object-center transition-[filter,transform] duration-300 ease-out group-hover:scale-110 group-hover:blur-[6px] group-hover:brightness-[0.55] ${
              overlayShown ? "scale-110 blur-[6px] brightness-[0.55]" : ""
            } ${props.imageClassName ?? ""}`.trim()}
            unoptimized={props.unoptimized}
          />
        ) : (
          <div
            className={`h-full w-full transition-[filter,transform] duration-300 ease-out group-hover:scale-110 group-hover:blur-[6px] group-hover:brightness-[0.55] ${
              overlayShown ? "scale-110 blur-[6px] brightness-[0.55]" : ""
            }`}
          >
            <GameImagePlaceholder title={props.title} />
          </div>
        )}

        <button
          type="button"
          onClick={handleCardTap}
          aria-label={props.ariaLabel ?? displayTitle}
          className="absolute inset-0 z-[1] cursor-pointer"
        />

        {providerLabel ? (
          <span
            className={`pointer-events-none absolute left-1 top-1 z-[2] max-w-[calc(100%-1.5rem)] truncate text-[7px] font-bold uppercase leading-none tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] transition-opacity duration-150 group-hover:opacity-0 ${
              overlayShown ? "opacity-0" : ""
            }`}
          >
            {providerLabel}
          </span>
        ) : null}

        {displayTitle ? (
          <span
            className={`pointer-events-none absolute bottom-1 left-1/2 z-[2] max-w-[calc(100%-0.4rem)] -translate-x-1/2 truncate px-0.5 text-center text-[9px] font-semibold tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] transition-opacity duration-150 group-hover:opacity-0 ${
              overlayShown ? "opacity-0" : ""
            }`}
          >
            {displayTitle}
          </span>
        ) : null}

        <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden" aria-hidden>
          <span className="game-card-shine-beam" />
        </div>

        <div
          className={`absolute inset-0 z-[3] flex flex-col items-center justify-center transition-opacity duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100 ${
            overlayShown ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <button
            type="button"
            aria-label={t.sidebar.favorites}
            aria-pressed={favorited}
            onClick={(e) => {
              e.stopPropagation();
              setFavorited((v) => !v);
            }}
            className={`absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/35 shadow-[0_1px_4px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:h-6 sm:w-6 ${
              overlayShown ? "translate-y-0 opacity-100" : "translate-y-[-8px] opacity-0"
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white" fillOpacity={favorited ? 1 : 0.95} aria-hidden>
              <path d="M12 21s-6.72-4.24-9.4-7.72C.5 10.7 1.15 7.15 4.2 5.7 6.35 4.68 8.55 5.3 12 8.2c3.45-2.9 5.65-3.52 7.8-2.5 3.05 1.45 3.7 5 1.6 7.58C18.72 16.76 12 21 12 21z" />
            </svg>
          </button>

          <div
            className={`flex w-[86%] flex-col items-stretch gap-1 transition-all duration-300 delay-75 ease-out group-hover:translate-y-0 group-hover:opacity-100 ${
              overlayShown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                play();
              }}
              className="min-h-[22px] rounded-md px-1 py-1 text-center text-[8px] font-extrabold leading-tight sm:text-[9px]"
              style={goldActionStyle}
            >
              {t.home.playNow}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                play();
              }}
              className="min-h-[22px] rounded-md px-1 py-1 text-center text-[8px] font-extrabold leading-tight sm:text-[9px]"
              style={goldActionStyle}
            >
              {t.home.freeTrial}
            </button>
          </div>

          <div
            className={`absolute inset-x-0 bottom-1 px-0.5 text-center transition-all duration-300 delay-100 ease-out group-hover:translate-y-0 group-hover:opacity-100 ${
              overlayShown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            {displayTitle ? (
              <p className="truncate text-[8px] font-semibold leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {displayTitle}
              </p>
            ) : null}
            {providerLabel ? (
              <p className="truncate text-[9px] font-black uppercase leading-tight tracking-wide text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                {providerLabel}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
