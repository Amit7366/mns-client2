"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {
  OPEN_AUTH_MODAL_EVENT,
  type AuthModalMode,
  type OpenAuthModalDetail,
} from "@/lib/auth-modal-events";
import { useLocale } from "@/components/LocaleProvider";
import { getAuthMessages } from "@/lib/i18n/auth-messages";

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function AuthModal() {
  const { preferences } = useLocale();
  const a = getAuthMessages(preferences.locale);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthModalMode>("login");
  const [nextPath, setNextPath] = useState<string | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<OpenAuthModalDetail>).detail;
      setMode(detail?.mode === "register" ? "register" : "login");
      setNextPath(detail?.next ?? null);
      setOpen(true);
    };
    window.addEventListener(OPEN_AUTH_MODAL_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_AUTH_MODAL_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="auth-modal-root" role="presentation">
      <button type="button" className="auth-modal-backdrop" aria-label={a.close} onClick={close} />
      <div
        className="auth-modal-stage"
        role="dialog"
        aria-modal="true"
        aria-label={mode === "login" ? a.loginTitle : a.registerTitle}
      >
        <button type="button" onClick={close} className="auth-modal-close" aria-label={a.close}>
          <CloseIcon />
        </button>
        <div className="auth-modal-scroll">
          <Suspense fallback={null}>
            {mode === "login" ? (
              <LoginForm
                nextPath={nextPath}
                onSuccess={close}
                onSwitchToRegister={() => setMode("register")}
              />
            ) : (
              <RegisterForm onSuccess={close} onSwitchToLogin={() => setMode("login")} />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
