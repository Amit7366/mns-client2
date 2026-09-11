"use client";

import { useState, type ReactNode } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { getAuthMessages } from "@/lib/i18n/auth-messages";
import AuthSubmitLoader from "./AuthSubmitLoader";

export function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="6.5" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.2 16c.8-3 3-4.6 5.8-4.6s5 1.6 5.8 4.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M6.2 3.4h2.4l.8 2.4-1.4 1.1a10.5 10.5 0 005.1 5.1l1.1-1.4 2.4.8v2.4c0 .6-.5 1.2-1.1 1.3A13.6 13.6 0 014.1 4.5c.1-.6.7-1.1 1.3-1.1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="4.2" y="9" width="11.6" height="7.2" rx="1.8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6.8 9V7.2a3.2 3.2 0 016.4 0V9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3 3l14 14M8 8.2A3.2 3.2 0 0110 7.4c3.6 0 6.6 3.3 7.5 4.1-.5.4-1.2.9-2.1 1.4M6.2 6.4C4.6 7.3 3.4 8.6 2.5 9.5c1.2 1.2 4.4 4.1 7.5 4.1 1 0 1.9-.2 2.8-.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeOnIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M2.5 10s2.8-5 7.5-5 7.5 5 7.5 5-2.8 5-7.5 5-7.5-5-7.5-5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function AuthCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="auth-card">
      <h1 className="auth-card-title">{title}</h1>
      {children}
    </div>
  );
}

export function AuthSwitchLine({
  prompt,
  action,
  onClick,
}: {
  prompt: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <p className="auth-card-switch">
      {prompt}{" "}
      <button type="button" onClick={onClick} className="auth-card-switch-link">
        {action}
      </button>
    </p>
  );
}

export function AuthPillInput({
  icon,
  type = "text",
  autoComplete,
  value,
  onChange,
  placeholder,
  disabled,
  inputMode,
  maxLength,
}: {
  icon: ReactNode;
  type?: "text" | "tel" | "password";
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  inputMode?: "text" | "numeric" | "tel";
  maxLength?: number;
}) {
  return (
    <label className="auth-pill">
      <span className="auth-pill-icon">{icon}</span>
      <input
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        inputMode={inputMode}
        maxLength={maxLength}
        className="auth-pill-input"
      />
    </label>
  );
}

export function AuthPillPassword({
  value,
  onChange,
  placeholder,
  autoComplete = "current-password",
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete?: "current-password" | "new-password";
  disabled?: boolean;
}) {
  const { preferences } = useLocale();
  const a = getAuthMessages(preferences.locale);
  const [visible, setVisible] = useState(false);
  const toggleLabel = visible ? a.hidePassword : a.showPassword;

  return (
    <label className="auth-pill">
      <span className="auth-pill-icon">
        <LockIcon />
      </span>
      <input
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="auth-pill-input auth-pill-input-password"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="auth-pill-eye"
        aria-label={toggleLabel}
        aria-pressed={visible}
      >
        {visible ? <EyeOnIcon /> : <EyeOffIcon />}
      </button>
    </label>
  );
}

export function AuthGoldButton({
  loading,
  disabled,
  children,
}: {
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button type="submit" disabled={disabled || loading} aria-busy={loading} className="auth-gold-btn">
      {loading ? (
        <>
          <AuthSubmitLoader />
          <span className="sr-only">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function AuthError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="auth-card-error" role="alert">
      {message}
    </p>
  );
}
