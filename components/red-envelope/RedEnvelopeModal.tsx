"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useLocale } from "@/components/LocaleProvider";
import { useToast } from "@/components/ToastProvider";
import { applySessionBalance } from "@/lib/auth/api";
import { openGoldenEgg } from "@/lib/golden-egg-events";
import {
  claimRedEnvelope,
  fetchRedEnvelopeStatus,
  type RedEnvelopeStatus,
} from "@/lib/red-envelope-api";
import { openSpinWheel } from "@/lib/spin-wheel-events";
import {
  formatRedEnvelopeAmount,
  getRedEnvelopeMessages,
} from "@/lib/i18n/red-envelope-messages";

const CARD_COUNT = 7;
const DISPLAY_WINDOW_MS = 24 * 60 * 60 * 1000;

type Phase = "idle" | "opening" | "revealed" | "locked";

type Drift = {
  left: number;
  duration: number;
  delay: number;
  tilt: number;
  scale: number;
};

type RedEnvelopeModalProps = {
  open: boolean;
  onClose: () => void;
  initialStatus?: RedEnvelopeStatus | null;
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

function makeDrifts(): Drift[] {
  return Array.from({ length: CARD_COUNT }, () => ({
    left: 4 + Math.random() * 74,
    duration: 3.1 + Math.random() * 2.2,
    delay: Math.random() * -5,
    tilt: -18 + Math.random() * 36,
    scale: 0.68 + Math.random() * 0.38,
  }));
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="9" fill="#f59e0b" stroke="#fde68a" strokeWidth="1.4" />
      <path d="M11 6.5V11l3 2.2" stroke="#7c2d12" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function EnvelopeFan({ openBurst }: { openBurst: boolean }) {
  return (
    <div className={`red-envelope-fan ${openBurst ? "is-open" : ""}`} aria-hidden>
      <img src="/card.gif" alt="" className="is-left" draggable={false} />
      <img src="/card.gif" alt="" className="is-right" draggable={false} />
      <img src="/card.gif" alt="" className="is-front" draggable={false} />
      <span className="red-envelope-coin" style={{ left: "18%", top: "8%", animationDelay: "80ms" }} />
      <span className="red-envelope-coin is-sm" style={{ left: "42%", top: "0%", animationDelay: "160ms" }} />
      <span className="red-envelope-coin" style={{ left: "62%", top: "10%", animationDelay: "40ms" }} />
      <span className="red-envelope-coin is-sm" style={{ left: "78%", top: "18%", animationDelay: "220ms" }} />
      <span className="red-envelope-ribbon" />
      <span className="red-envelope-ribbon is-right" />
    </div>
  );
}

export default function RedEnvelopeModal({ open, onClose, initialStatus }: RedEnvelopeModalProps) {
  const { refreshBalance } = useAuth();
  const { preferences } = useLocale();
  const { showToast } = useToast();
  const locale = preferences.locale;
  const m = getRedEnvelopeMessages(locale);

  const [loading, setLoading] = useState(!initialStatus);
  const [phase, setPhase] = useState<Phase>("idle");
  const [drifts, setDrifts] = useState<Drift[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [amounts, setAmounts] = useState<(number | null)[]>(() => Array(CARD_COUNT).fill(null));
  const [countdownMs, setCountdownMs] = useState(0);
  const [winBurst, setWinBurst] = useState<number | null>(null);
  const busyRef = useRef(false);

  const loadStatus = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchRedEnvelopeStatus();
      if (data.canClaim) {
        setDrifts(makeDrifts());
        setPhase("idle");
        setCountdownMs(DISPLAY_WINDOW_MS);
        setAmounts(Array(CARD_COUNT).fill(null));
        setPicked(null);
        setWinBurst(null);
      } else {
        setDrifts([]);
        setPhase("locked");
        setCountdownMs(data.remainingMs);
        setAmounts(Array(CARD_COUNT).fill(null));
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
    const id = window.setTimeout(() => setWinBurst(null), 2400);
    return () => window.clearTimeout(id);
  }, [winBurst]);

  const clock = useMemo(() => splitCountdown(countdownMs), [countdownMs]);

  const openCard = useCallback(
    async (index: number) => {
      if (busyRef.current || phase !== "idle") return;
      busyRef.current = true;
      setPhase("opening");
      setPicked(index);
      try {
        const result = await claimRedEnvelope();
        const nextAmounts: (number | null)[] = Array(CARD_COUNT).fill(null);
        nextAmounts[index] = result.winAmount;
        let decoy = 0;
        for (let i = 0; i < CARD_COUNT; i += 1) {
          if (i === index) continue;
          nextAmounts[i] = result.decoyAmounts[decoy] ?? 18;
          decoy += 1;
        }
        setAmounts(nextAmounts);
        setWinBurst(result.winAmount);
        setPhase("revealed");
        setCountdownMs(result.remainingMs);
        applySessionBalance(result.currentBalance);
        await refreshBalance();
        showToast(m.winMessage.replace("{amount}", formatRedEnvelopeAmount(result.winAmount, locale)), {
          variant: "success",
        });
      } catch (err) {
        setPhase("idle");
        setPicked(null);
        showToast(err instanceof Error ? err.message : m.claimError, { variant: "error" });
      } finally {
        busyRef.current = false;
      }
    },
    [locale, m.claimError, m.winMessage, phase, refreshBalance, showToast]
  );

  const switchTo = useCallback(
    (kind: "wheel" | "egg") => {
      if (phase === "opening") return;
      onClose();
      if (kind === "wheel") openSpinWheel();
      else openGoldenEgg();
    },
    [onClose, phase]
  );

  if (!open) return null;

  const canTap = phase === "idle" && !loading;

  return (
    <div className="fixed inset-0 z-[96] flex items-end justify-center bg-black/75 sm:items-center">
      <button type="button" className="absolute inset-0" aria-label={m.close} onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="golden-egg-modal relative flex max-h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden sm:max-h-[92dvh] sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
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
            <div className="golden-egg-ribbon">
              <span>{m.title}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 px-1">
            <span className="golden-egg-tab-arrow" aria-hidden />
            <button
              type="button"
              className="golden-egg-tab cursor-pointer border-0 p-0"
              onClick={() => switchTo("wheel")}
              aria-label={m.wheelTab}
            >
              <img src="/wheel.gif" alt="" width={54} height={54} className="h-11 w-11 object-contain" />
            </button>
            <button
              type="button"
              className="golden-egg-tab cursor-pointer border-0 p-0"
              onClick={() => switchTo("egg")}
              aria-label={m.eggTab}
            >
              <img src="/golden-egg.png" alt="" width={64} height={64} className="h-12 w-12 object-contain" />
            </button>
            <div className="golden-egg-tab is-current" aria-current="true" aria-label={m.cardTab}>
              <img src="/card.gif" alt="" width={54} height={54} className="h-11 w-11 object-contain" />
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
              <span>{m.winMessage.replace("{amount}", formatRedEnvelopeAmount(winBurst, locale))}</span>
            </div>
          ) : null}

          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center text-sm text-white/70">…</div>
          ) : phase === "revealed" || phase === "locked" ? (
            <div className="pb-2">
              <EnvelopeFan openBurst={phase === "revealed"} />
              {phase === "revealed" ? (
                <div className="mt-1 flex flex-wrap items-end justify-center gap-2 px-1">
                  {amounts.map((amount, index) => (
                    <div key={index} className="relative flex w-12 flex-col items-center">
                      <img src="/card.gif" alt="" width={44} height={44} className="h-11 w-11 object-contain" draggable={false} />
                      {amount !== null ? (
                        <span className={`red-envelope-chip ${picked === index ? "is-win" : ""}`}>
                          ৳{formatRedEnvelopeAmount(amount, locale)}
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="red-envelope-stage" aria-hidden={false}>
              {drifts.map((drift, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={!canTap}
                  onClick={() => void openCard(index)}
                  className={`red-envelope-fall ${picked === index ? "is-picked" : ""}`}
                  style={{
                    left: `${drift.left}%`,
                    animationDuration: `${drift.duration}s`,
                    animationDelay: `${drift.delay}s`,
                    ["--tilt" as string]: `${drift.tilt}deg`,
                    ["--scale" as string]: String(drift.scale),
                  }}
                  aria-label={`${m.cardTab} ${index + 1}`}
                >
                  <img src="/card.gif" alt="" width={72} height={72} draggable={false} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
