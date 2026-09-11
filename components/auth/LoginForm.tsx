"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { loginWithUsername } from "@/lib/auth/api";
import { getAuthMessages } from "@/lib/i18n/auth-messages";
import { changePasswordHref } from "@/lib/member-profile-tabs";
import {
  AuthCard,
  AuthError,
  AuthGoldButton,
  AuthPillInput,
  AuthPillPassword,
  AuthSwitchLine,
  UserIcon,
} from "./AuthCard";

const REMEMBER_KEY = "bkbaji.auth.rememberUsername";

function authErrorMessage(err: unknown, fallback: string, networkFallback: string): string {
  if (err instanceof TypeError) return networkFallback;
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

type LoginFormProps = {
  nextPath?: string | null;
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
};

export default function LoginForm({ nextPath, onSuccess, onSwitchToRegister }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { preferences } = useLocale();
  const a = getAuthMessages(preferences.locale);
  const base = `/${preferences.locale}`;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(REMEMBER_KEY);
      if (saved) {
        setUsername(saved);
        setRemember(true);
      }
    } catch {
      // ignore
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError(a.usernameRequired);
      return;
    }
    if (!password) {
      setError(a.passwordRequired);
      return;
    }

    setLoading(true);
    try {
      const { session } = await loginWithUsername(username, password);
      try {
        if (remember) localStorage.setItem(REMEMBER_KEY, username.trim());
        else localStorage.removeItem(REMEMBER_KEY);
      } catch {
        // ignore
      }

      const next = nextPath ?? searchParams.get("next");
      const isChangePasswordNext = !!next && next.startsWith(changePasswordHref(preferences.locale));
      const shouldGoHome = isChangePasswordNext && session?.needsPasswordChange === false;
      const target =
        shouldGoHome
          ? base
          : next && next.startsWith(`/${preferences.locale}/`) && !next.includes("//")
            ? next
            : base;

      if (onSuccess) {
        onSuccess();
        if (target !== base) router.push(target);
        router.refresh();
        return;
      }

      router.push(target);
      router.refresh();
    } catch (err) {
      setError(authErrorMessage(err, a.loginError, a.networkError));
    } finally {
      setLoading(false);
    }
  }

  function goRegister() {
    if (onSwitchToRegister) {
      onSwitchToRegister();
      return;
    }
    router.push(`${base}/register`);
  }

  function goForgot() {
    router.push(`${base}/forgot-password`);
  }

  return (
    <AuthCard title={a.loginTitle}>
      <AuthSwitchLine prompt={a.noAccount} action={a.registerNow} onClick={goRegister} />
      <form onSubmit={handleSubmit} className="auth-card-form">
        <AuthError message={error} />
        <AuthPillInput
          icon={<UserIcon />}
          autoComplete="username"
          value={username}
          onChange={setUsername}
          placeholder={a.enterUsername}
          disabled={loading}
        />
        <AuthPillPassword
          value={password}
          onChange={setPassword}
          placeholder={a.enterPassword}
          autoComplete="current-password"
          disabled={loading}
        />
        <div className="auth-card-meta">
          <label className="auth-remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="auth-remember-input"
            />
            <span className="auth-remember-box" aria-hidden />
            <span>{a.rememberMe}</span>
          </label>
          <button type="button" onClick={goForgot} className="auth-forgot">
            {a.forgotPassword}
          </button>
        </div>
        <AuthGoldButton loading={loading}>{a.logInButton}</AuthGoldButton>
      </form>
    </AuthCard>
  );
}
