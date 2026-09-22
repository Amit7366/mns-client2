"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { fetchSpinStatus, type SpinStatus } from "@/lib/spin-api";
import { OPEN_SPIN_WHEEL_EVENT } from "@/lib/spin-wheel-events";
import SpinWheelModal from "./SpinWheelModal";

const WINDOW_MS = 24 * 60 * 60 * 1000;
const NEXT_SHOW_KEY = "bkbaji.spin.nextShowAt";

function isHomePath(pathname: string): boolean {
  return /^\/(bn|en|hi)\/?$/.test(pathname);
}

function readNextShowAt(): number {
  try {
    return Number(localStorage.getItem(NEXT_SHOW_KEY) || 0);
  } catch {
    return 0;
  }
}

function scheduleNextShow(): number {
  const next = Date.now() + WINDOW_MS;
  try {
    localStorage.setItem(NEXT_SHOW_KEY, String(next));
  } catch {
    // Ignore storage errors
  }
  return next;
}

export default function HomeSpinWheelGate() {
  const pathname = usePathname();
  const { isAuthenticated, authReady } = useAuth();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<SpinStatus | null>(null);
  const [resumeAt, setResumeAt] = useState<number | null>(null);
  const checkedRef = useRef(false);

  const checkAndShow = useCallback(async () => {
    if (!isHomePath(pathname) || !isAuthenticated) return;
    if (readNextShowAt() > Date.now()) return;

    try {
      const data = await fetchSpinStatus();
      setStatus(data);
      setResumeAt(scheduleNextShow());
      setOpen(true);
    } catch {
      // Silent — don't block the home page
    }
  }, [pathname, isAuthenticated]);

  useEffect(() => {
    if (!authReady || !isHomePath(pathname) || !isAuthenticated) return;
    if (checkedRef.current) return;

    checkedRef.current = true;
    const timer = window.setTimeout(() => {
      void checkAndShow();
    }, 500);
    return () => window.clearTimeout(timer);
  }, [authReady, pathname, isAuthenticated, checkAndShow]);

  useEffect(() => {
    if (!isAuthenticated) {
      checkedRef.current = false;
      setOpen(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const onOpen = () => {
      if (!isAuthenticated) return;
      const scheduled = readNextShowAt();
      setResumeAt(scheduled > Date.now() ? scheduled : Date.now() + WINDOW_MS);
      void (async () => {
        try {
          const data = await fetchSpinStatus();
          setStatus(data);
        } catch {
          setStatus(null);
        }
        setOpen(true);
      })();
    };
    window.addEventListener(OPEN_SPIN_WHEEL_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SPIN_WHEEL_EVENT, onOpen);
  }, [isAuthenticated]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <SpinWheelModal
      open={open}
      onClose={handleClose}
      initialStatus={status}
      resumeAt={resumeAt}
    />
  );
}
