"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useLocale } from "@/components/LocaleProvider";
import { useToast } from "@/components/ToastProvider";
import {
  claimGoldenEgg,
  fetchGoldenEggStatus,
  type GoldenEggStatus,
} from "@/lib/golden-egg-api";
import {
  formatGoldenEggAmount,
  getGoldenEggMessages,
} from "@/lib/i18n/golden-egg-messages";

const EGG_COUNT = 8;
const EGG_ROWS = [
  [0, 1],
  [2, 3, 4],
  [5, 6, 7],
] as const;
const DISPLAY_WINDOW_MS = 24 * 60 * 60 * 1000;
const HAMMER_HIT_MS = 480;
const HAMMER_HOLD_MS = 240;

type Phase = "idle" | "hitting" | "revealed" | "locked";

type GoldenEggModalProps = {
  open: boolean;
  onClose: () => void;
  initialStatus?: GoldenEggStatus | null;
};

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function splitCountdown(ms: number): { h: string; m: string; s: string } {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return { h: pad2(h), m: pad2(m), s: pad2(s) };
}

function pickActiveEggs(): Set<number> {
  const count = Math.random() < 0.55 ? 1 : 2;
  const pool = Array.from({ length: EGG_COUNT }, (_, i) => i);
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return new Set(pool.slice(0, count));
}

function CrownHorns() {
  return (
    <svg width="168" height="52" viewBox="0 0 168 52" fill="none" aria-hidden className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]">
      <path d="M18 38c6-16 16-28 22-32 2 10-2 24-8 32" fill="#d4a017" stroke="#f5d76e" strokeWidth="1.4" />
      <path d="M150 38c-6-16-16-28-22-32-2 10 2 24 8 32" fill="#d4a017" stroke="#f5d76e" strokeWidth="1.4" />
      <path d="M58 34c4-14 12-24 26-28 14 4 22 14 26 28" fill="#c9a227" />
      <path d="M68 22h32l-4 14H72z" fill="#e8c547" />
      <circle cx="84" cy="14" r="8" fill="#e11d48" stroke="#f5d76e" strokeWidth="1.5" />
      <path d="M78 12.5 84 8l6 4.5-2.2 7H80.2z" fill="#fde68a" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="9" fill="#f59e0b" stroke="#fde68a" strokeWidth="1.4" />
      <path d="M11 6.5V11l3 2.2" stroke="#7c2d12" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function HammerIcon() {
  return (
    <svg className="golden-egg-hammer-svg" width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
      <g transform="rotate(-18 28 28)">
        <rect x="24" y="18" width="8" height="30" rx="3" fill="#8b5a2b" stroke="#5c3a1e" strokeWidth="1.2" />
        <rect x="14" y="8" width="28" height="14" rx="3" fill="url(#hammerGold)" stroke="#f5d76e" strokeWidth="1.2" />
        <rect x="16" y="11" width="24" height="4" rx="1" fill="#fff3c4" opacity="0.45" />
      </g>
      <defs>
        <linearGradient id="hammerGold" x1="14" y1="8" x2="42" y2="22">
          <stop stopColor="#ffe08a" />
          <stop offset="1" stopColor="#c9a227" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function EggCrackMark() {
  return (
    <svg className="golden-egg-crack" viewBox="0 0 86 102" fill="none" aria-hidden>
      <path
        d="M43 18c2 10-6 16-1 24s-7 12 0 20-8 12 1 22"
        stroke="#6b3f08"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

type EggSlotProps = {
  index: number;
  active: boolean;
  hitting: boolean;
  cracked: boolean;
  amount: number | null;
  isWin: boolean;
  locked: boolean;
  locale: ReturnType<typeof useLocale>["preferences"]["locale"];
  onSmash: (index: number) => void;
};

function EggSlot({
  index,
  active,
  hitting,
  cracked,
  amount,
  isWin,
  locked,
  locale,
  onSmash,
}: EggSlotProps) {
  const clickable = active && !hitting && !cracked && !locked && amount === null;
  const revealed = amount !== null;

  return (
    <button
      type="button"
      disabled={!clickable}
      onClick={() => onSmash(index)}
      className={`golden-egg-slot ${active ? "is-active" : ""} ${hitting ? "is-hitting" : ""} ${cracked || revealed ? "is-cracked" : ""} ${locked && !revealed ? "is-locked" : ""}`}
      aria-label={clickable ? `Egg ${index + 1}` : `Egg ${index + 1}`}
    >
      <span className="golden-egg-glow" />
      {hitting ? (
        <span className="golden-egg-hammer-wrap">
          <HammerIcon />
        </span>
      ) : null}
      {hitting ? <span className="golden-egg-spark" /> : null}
      <span
        className={`golden-egg-body ${active && !hitting && !cracked && !revealed ? "golden-egg-shake" : ""}`}
        style={active && !hitting && !cracked && !revealed ? { animationDelay: `${index * 0.12}s` } : undefined}
      >
        <img
          src="/golden-egg.png"
          alt=""
          width={92}
          height={92}
          className="golden-egg-img"
          draggable={false}
        />
        {cracked || revealed ? <EggCrackMark /> : null}
      </span>
      {revealed ? (
        <span
          className={`golden-egg-amount ${isWin ? "is-win" : ""}`}
          style={{ animationDelay: isWin ? "0ms" : `${120 + index * 70}ms` }}
        >
          ৳{formatGoldenEggAmount(amount, locale)}
        </span>
      ) : null}
    </button>
  );
}

export default function GoldenEggModal({ open, onClose, initialStatus }: GoldenEggModalProps) {
  const { refreshBalance } = useAuth();
  const { preferences } = useLocale();
  const { showToast } = useToast();
  const locale = preferences.locale;
  const m = getGoldenEggMessages(locale);

  const [status, setStatus] = useState<GoldenEggStatus | null>(initialStatus ?? null);
  const [loading, setLoading] = useState(!initialStatus);
  const [phase, setPhase] = useState<Phase>("idle");
  const [hitIndex, setHitIndex] = useState<number | null>(null);
  const [crackedIndex, setCrackedIndex] = useState<number | null>(null);
  const [amounts, setAmounts] = useState<(number | null)[]>(() => Array(EGG_COUNT).fill(null));
  const [countdownMs, setCountdownMs] = useState(0);
  const [winBurst, setWinBurst] = useState<number | null>(null);
  const activeRef = useRef<Set<number>>(new Set());
  const [activeEggs, setActiveEggs] = useState<Set<number>>(() => new Set());
  const busyRef = useRef(false);

  const loadStatus = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchGoldenEggStatus();
      setStatus(data);
      if (data.canClaim) {
        const next = pickActiveEggs();
        activeRef.current = next;
        setActiveEggs(next);
        setPhase("idle");
        setCountdownMs(DISPLAY_WINDOW_MS);
        setAmounts(Array(EGG_COUNT).fill(null));
        setHitIndex(null);
        setCrackedIndex(null);
        setWinBurst(null);
      } else {
        activeRef.current = new Set();
        setActiveEggs(new Set());
        setPhase("locked");
        setCountdownMs(data.remainingMs);
        setAmounts(Array(EGG_COUNT).fill(null));
      }
    } catch {
      showToast(m.loadError, { variant: "error" });
      setPhase("locked");
    } finally {
      setLoading(false);
    }
  }, [m.loadError, showToast]);

  useEffect(() => {
    if (!open) return undefined;
    void loadStatus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, loadStatus]);

  useEffect(() => {
    if (!open) return undefined;
    const id = window.setInterval(() => {
      setCountdownMs((ms) => Math.max(0, ms - 1000));
    }, 1000);
    return () => window.clearInterval(id);
  }, [open]);

  useEffect(() => {
    if (winBurst === null) return undefined;
    const id = window.setTimeout(() => setWinBurst(null), 2200);
    return () => window.clearTimeout(id);
  }, [winBurst]);

  const clock = useMemo(() => splitCountdown(countdownMs), [countdownMs]);

  const smash = useCallback(
    async (index: number) => {
      if (busyRef.current || phase !== "idle" || !activeRef.current.has(index)) return;
      busyRef.current = true;
      setPhase("hitting");
      setHitIndex(index);

      const started = Date.now();
      try {
        const resultPromise = claimGoldenEgg();
        await new Promise((resolve) => window.setTimeout(resolve, HAMMER_HIT_MS));
        const result = await resultPromise;
        setCrackedIndex(index);

        const nextAmounts: (number | null)[] = Array(EGG_COUNT).fill(null);
        nextAmounts[index] = result.winAmount;
        setAmounts([...nextAmounts]);

        await new Promise((resolve) => window.setTimeout(resolve, 280));

        let decoy = 0;
        for (let i = 0; i < EGG_COUNT; i += 1) {
          if (i === index) continue;
          nextAmounts[i] = result.decoyAmounts[decoy] ?? 18;
          decoy += 1;
        }
        setAmounts([...nextAmounts]);
        setWinBurst(result.winAmount);

        const hold = Math.max(0, HAMMER_HIT_MS + HAMMER_HOLD_MS - (Date.now() - started));
        await new Promise((resolve) => window.setTimeout(resolve, hold));

        setPhase("revealed");
        setHitIndex(null);
        setCountdownMs(result.remainingMs);
        setStatus((prev) =>
          prev
            ? {
                ...prev,
                canClaim: false,
                remainingMs: result.remainingMs,
                lastAmount: result.winAmount,
                lastClaimedAt: result.lastClaimedAt,
                nextClaimAt: result.nextClaimAt,
                totalClaimed: result.totalClaimed,
              }
            : prev
        );
        await refreshBalance();
        showToast(m.winMessage.replace("{amount}", formatGoldenEggAmount(result.winAmount, locale)), {
          variant: "success",
        });
      } catch (err) {
        setPhase("idle");
        setHitIndex(null);
        setCrackedIndex(null);
        showToast(err instanceof Error ? err.message : m.claimError, { variant: "error" });
      } finally {
        busyRef.current = false;
      }
    },
    [locale, m.claimError, m.winMessage, phase, refreshBalance, showToast]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[86] flex items-end justify-center bg-black/75 sm:items-center">
      <button type="button" className="absolute inset-0" aria-label={m.close} onClick={onClose} />
      <div className="golden-egg-modal relative flex max-h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden sm:max-h-[92dvh] sm:rounded-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label={m.close}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-black shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="golden-egg-modal-scroll relative overflow-y-auto px-3 pb-8 pt-3 sm:px-4">
          <div className="flex flex-col items-center pt-1">
            <CrownHorns />
            <div className="golden-egg-ribbon -mt-1">
              <span>{m.title}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 px-1">
            <span className="golden-egg-tab-arrow" aria-hidden />
            <div className="golden-egg-tab">
              <img src="/wheel.gif" alt="" width={54} height={54} className="h-11 w-11 object-contain" />
            </div>
            <div className="golden-egg-tab is-current">
              <img src="/golden-egg.png" alt="" width={64} height={64} className="h-12 w-12 object-contain" />
            </div>
            <div className="golden-egg-tab">
              <img src="/prize.gif" alt="" width={54} height={54} className="h-11 w-11 object-contain" />
            </div>
            <span className="golden-egg-tab-arrow is-right" aria-hidden />
          </div>

          <h2 className="golden-egg-headline mt-4 px-2 text-center">{m.headline}</h2>

          <div className="mt-3 flex items-center justify-center gap-2">
            <ClockIcon />
            <span className="text-[13px] font-semibold text-amber-100/90">{m.remaining}</span>
            <div className="flex items-end gap-1">
              {(
                [
                  [clock.h, m.hours],
                  [clock.m, m.minutes],
                  [clock.s, m.seconds],
                ] as const
              ).map(([value, label], i) => (
                <div key={label} className="flex items-end gap-1">
                  {i > 0 ? <span className="golden-egg-colon">:</span> : null}
                  <div className="flex flex-col items-center">
                    <span className="golden-egg-time">{value}</span>
                    <span className="mt-0.5 text-[9px] tracking-wide text-white/55">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-2 text-center text-[12px] font-medium text-amber-200/90">
            {phase === "locked" || phase === "revealed" ? m.alreadyClaimed : m.tapHint}
          </p>

          {winBurst !== null ? (
            <div className="golden-egg-win-burst" aria-live="polite">
              <strong>{m.winTitle}</strong>
              <span>{m.winMessage.replace("{amount}", formatGoldenEggAmount(winBurst, locale))}</span>
            </div>
          ) : null}

          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center text-sm text-white/70">…</div>
          ) : (
            <div className="mt-2 flex flex-col items-center gap-2 pb-4">
              {EGG_ROWS.map((row) => (
                <div
                  key={row.join("-")}
                  className={`flex items-end justify-center ${row.length === 2 ? "gap-8" : "gap-4"}`}
                >
                  {row.map((eggIndex) => (
                    <EggSlot
                      key={eggIndex}
                      index={eggIndex}
                      active={activeEggs.has(eggIndex)}
                      hitting={hitIndex === eggIndex}
                      cracked={crackedIndex === eggIndex}
                      amount={amounts[eggIndex]}
                      isWin={crackedIndex === eggIndex}
                      locked={phase === "locked"}
                      locale={locale}
                      onSmash={smash}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
