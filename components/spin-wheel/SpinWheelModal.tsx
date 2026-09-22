"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useLocale } from "@/components/LocaleProvider";
import { useToast } from "@/components/ToastProvider";
import {
  formatSpinAmount,
  getSpinWheelMessages,
} from "@/lib/i18n/spin-wheel-messages";
import { applySessionBalance } from "@/lib/auth/api";
import { openGoldenEgg } from "@/lib/golden-egg-events";
import {
  fetchSpinStatus,
  playSpin,
  type SpinPlayResult,
  type SpinStatus,
} from "@/lib/spin-api";
import SpinWheelDisc, { computeSpinRotation } from "./SpinWheelDisc";

const WINDOW_MS = 24 * 60 * 60 * 1000;

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

function WheelTabIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" aria-hidden>
      <circle cx="23" cy="23" r="18" fill="#f5a623" />
      <circle cx="23" cy="23" r="14" fill="#fff8e8" stroke="#e08a12" strokeWidth="2" />
      <path d="M23 9 L26 23 L23 37 L20 23 Z" fill="#f3d27a" />
      <path d="M9 23 L23 20 L37 23 L23 26 Z" fill="#fff" />
      <circle cx="23" cy="23" r="5" fill="#f6c14a" stroke="#fff" strokeWidth="1.5" />
      <circle cx="23" cy="5.5" r="2" fill="#fff6d0" />
      <circle cx="40.5" cy="23" r="2" fill="#fff6d0" />
      <circle cx="23" cy="40.5" r="2" fill="#fff6d0" />
      <circle cx="5.5" cy="23" r="2" fill="#fff6d0" />
    </svg>
  );
}

function EnvelopeTabIcon() {
  return (
    <svg width="46" height="40" viewBox="0 0 46 40" aria-hidden>
      <rect x="4" y="8" width="38" height="26" rx="4" fill="#e11d2e" stroke="#f6d365" strokeWidth="1.6" />
      <path d="M4 12l19 12L42 12" stroke="#f6d365" strokeWidth="1.6" fill="none" />
      <rect x="14" y="3" width="18" height="8" rx="2" fill="#c01220" stroke="#f6d365" strokeWidth="1.2" />
      <circle cx="23" cy="22" r="4" fill="#f6d365" />
    </svg>
  );
}

type SpinWheelModalProps = {
  open: boolean;
  onClose: () => void;
  initialStatus?: SpinStatus | null;
  resumeAt?: number | null;
};

export default function SpinWheelModal({
  open,
  onClose,
  initialStatus,
  resumeAt,
}: SpinWheelModalProps) {
  const { refreshBalance } = useAuth();
  const { preferences } = useLocale();
  const { showToast } = useToast();
  const locale = preferences.locale;
  const m = getSpinWheelMessages(locale);

  const [status, setStatus] = useState<SpinStatus | null>(initialStatus ?? null);
  const [loading, setLoading] = useState(!initialStatus);
  const [spinning, setSpinning] = useState(false);
  const [winResult, setWinResult] = useState<SpinPlayResult | null>(null);
  const [rotation, setRotation] = useState(0);
  const [countdownMs, setCountdownMs] = useState(WINDOW_MS);

  const rotationRef = useRef(0);

  const loadStatus = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchSpinStatus();
      setStatus(data);
    } catch {
      showToast(m.loadError, { variant: "error" });
      onClose();
    } finally {
      setLoading(false);
    }
  }, [m.loadError, onClose, showToast]);

  useEffect(() => {
    if (!open) return;
    if (!initialStatus) {
      void loadStatus();
    } else {
      setStatus(initialStatus);
      setLoading(false);
    }
  }, [open, initialStatus, loadStatus]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !spinning) onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, spinning]);

  useEffect(() => {
    if (!open) return;
    const target =
      resumeAt && resumeAt > Date.now()
        ? resumeAt
        : Date.now() + (status?.remainingMs || WINDOW_MS);
    const tick = () => setCountdownMs(Math.max(0, target - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [open, resumeAt, status?.remainingMs]);

  const waitForSpinEnd = useCallback(
    (targetRotation: number) =>
      new Promise<void>((resolve) => {
        rotationRef.current = targetRotation;
        setRotation(targetRotation);
        window.setTimeout(resolve, 5000);
      }),
    []
  );

  const handleSpin = useCallback(async () => {
    if (!status?.canSpin || spinning) {
      if (!spinning && status && !status.canSpin) showToast(m.alreadySpun);
      return;
    }

    setSpinning(true);
    setWinResult(null);

    try {
      const result = await playSpin();
      const segmentCount = status.segmentCount || status.segments.length;
      const targetRotation = computeSpinRotation(
        result.segmentIndex,
        rotationRef.current,
        segmentCount
      );

      await waitForSpinEnd(targetRotation);
      setWinResult(result);
      setStatus((prev) =>
        prev
          ? {
              ...prev,
              canSpin: false,
              lastSpinAmount: result.winAmount,
              nextSpinAt: result.nextSpinAt,
              remainingMs: result.nextSpinAt
                ? Math.max(0, new Date(result.nextSpinAt).getTime() - Date.now())
                : prev.remainingMs,
            }
          : prev
      );
      applySessionBalance(result.currentBalance);
      await refreshBalance();
      showToast(
        m.winMessage.replace("{amount}", formatSpinAmount(result.winAmount, locale)),
        { variant: "success" }
      );
    } catch (err) {
      showToast(err instanceof Error ? err.message : m.loadError, { variant: "error" });
    } finally {
      setSpinning(false);
    }
  }, [
    status,
    spinning,
    waitForSpinEnd,
    refreshBalance,
    showToast,
    m.winMessage,
    m.alreadySpun,
    m.loadError,
    locale,
  ]);

  const handleEnvelope = useCallback(() => {
    if (spinning) return;
    onClose();
    openGoldenEgg();
  }, [onClose, spinning]);

  if (!open) return null;

  const segments = status?.segments ?? [];
  const clock = splitCountdown(countdownMs);
  const canSpin = Boolean(status?.canSpin) && !loading;

  return (
    <div className="fixed inset-0 z-[130] flex items-end justify-center bg-black/75 sm:items-center">
      <button
        type="button"
        className="absolute inset-0"
        aria-label={m.close}
        onClick={spinning ? undefined : onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="spin-wheel-title"
        className="golden-egg-modal relative flex max-h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden sm:max-h-[92dvh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={spinning}
          aria-label={m.close}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-black shadow-[0_2px_8px_rgba(0,0,0,0.35)] disabled:opacity-50"
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

          <div className="mt-4 flex items-center justify-center gap-3 px-1">
            <span className="golden-egg-tab-arrow" aria-hidden />
            <div className="golden-egg-tab is-current" aria-current="true" aria-label={m.wheelTab}>
              <WheelTabIcon />
            </div>
            <button
              type="button"
              className="golden-egg-tab cursor-pointer border-0 p-0"
              onClick={handleEnvelope}
              aria-label={m.envelopeTab}
            >
              <EnvelopeTabIcon />
            </button>
            <span className="golden-egg-tab-arrow is-right" aria-hidden />
          </div>

          <h2 id="spin-wheel-title" className="golden-egg-headline mt-4 px-2 text-center">
            <span className="text-white">{m.headlineLead}</span> {m.headline}
          </h2>

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

          {winResult ? (
            <div className="golden-egg-win-burst" aria-live="polite">
              <strong>{m.winTitle}</strong>
              <span>{m.winMessage.replace("{amount}", formatSpinAmount(winResult.winAmount, locale))}</span>
            </div>
          ) : null}

          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <span className="h-10 w-10 animate-spin rounded-full border-2 border-[#f5d76e]/30 border-t-[#f5d76e]" />
            </div>
          ) : (
            <SpinWheelDisc
              segments={segments}
              rotation={rotation}
              spinning={spinning}
              canSpin={canSpin}
              goLabel={m.go}
              onSpin={() => void handleSpin()}
            />
          )}

          <div className="mt-4 flex justify-center pb-2">
            <button
              type="button"
              onClick={() => void handleSpin()}
              disabled={loading || spinning || !canSpin}
              className="spin-prize-claim"
            >
              {spinning ? m.spinning : m.claim}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
