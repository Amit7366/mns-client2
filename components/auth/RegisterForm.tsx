"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { checkDeviceRegistrationStatus, registerAndLogin } from "@/lib/auth/api";
import { getAuthMessages } from "@/lib/i18n/auth-messages";
import {
  AuthCard,
  AuthError,
  AuthGoldButton,
  AuthPillInput,
  AuthPillPassword,
  AuthSwitchLine,
  PhoneIcon,
  UserIcon,
} from "./AuthCard";

function BangladeshFlag() {
  return (
    <span
      className="inline-block h-3.5 w-5 shrink-0 rounded-[1px] bg-[#006a4e]"
      style={{
        backgroundImage: "radial-gradient(circle at 35% 50%, #f42a41 42%, transparent 43%)",
      }}
      aria-hidden
    />
  );
}

function authErrorMessage(
  err: unknown,
  fallback: string,
  networkFallback: string,
  selfReferralFallback?: string,
  deviceAccountLimitFallback?: string,
): string {
  if (err instanceof TypeError) return networkFallback;
  if (err instanceof Error && err.message) {
    if (
      selfReferralFallback &&
      err.message.toLowerCase().includes("own referral code on this device")
    ) {
      return selfReferralFallback;
    }
    if (
      deviceAccountLimitFallback &&
      err.message.toLowerCase().includes("maximum number of accounts")
    ) {
      return deviceAccountLimitFallback;
    }
    return err.message;
  }
  return fallback;
}

type RegisterFormProps = {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
};

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refIdFromURL = searchParams.get("refId") || searchParams.get("ref") || "";
  const { preferences } = useLocale();
  const a = getAuthMessages(preferences.locale);
  const base = `/${preferences.locale}`;

  const [currency, setCurrency] = useState<"BDT" | "INR">(preferences.currency);
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deviceCheckLoading, setDeviceCheckLoading] = useState(true);
  const [registrationBlocked, setRegistrationBlocked] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function verifyDeviceRegistrationLimit() {
      try {
        const status = await checkDeviceRegistrationStatus();
        if (cancelled) return;
        if (!status.canRegister) {
          setRegistrationBlocked(true);
          setError(a.deviceAccountLimitError);
        }
      } catch {
        /* allow registration attempt; server enforces the limit */
      } finally {
        if (!cancelled) setDeviceCheckLoading(false);
      }
    }

    void verifyDeviceRegistrationLimit();
    return () => {
      cancelled = true;
    };
  }, [a.deviceAccountLimitError]);

  const formDisabled = loading || deviceCheckLoading || registrationBlocked;
  const phonePrefix = currency === "INR" ? "+91" : "+880";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!phone.trim()) {
      setError(a.phoneRequired);
      return;
    }
    if (!username.trim()) {
      setError(a.usernameRequired);
      return;
    }
    if (!password.trim()) {
      setError(a.passwordRequired);
      return;
    }
    if (password.length < 6) {
      setError(a.passwordTooShort);
      return;
    }

    setLoading(true);
    try {
      await registerAndLogin({
        userName: username,
        password,
        contactNo: phone,
        currency,
        ...(refIdFromURL ? { referredBy: refIdFromURL } : {}),
      });
      if (onSuccess) {
        onSuccess();
        router.refresh();
        return;
      }
      router.push(base);
      router.refresh();
    } catch (err) {
      setError(
        authErrorMessage(
          err,
          a.registerError,
          a.networkError,
          a.selfReferralDeviceError,
          a.deviceAccountLimitError,
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  function goLogin() {
    if (onSwitchToLogin) {
      onSwitchToLogin();
      return;
    }
    router.push(`${base}/login`);
  }

  return (
    <AuthCard title={a.registerTitle}>
      <AuthSwitchLine prompt={a.haveAccount} action={a.loginNow} onClick={goLogin} />
      <form onSubmit={handleSubmit} className="auth-card-form">
        <AuthError message={error} />

        <div className="auth-currency" role="group" aria-label={a.chooseCurrency}>
          {(["BDT", "INR"] as const).map((code) => (
            <button
              key={code}
              type="button"
              disabled={formDisabled}
              onClick={() => setCurrency(code)}
              className={`auth-currency-chip ${currency === code ? "is-active" : ""}`}
            >
              {code === "BDT" ? <BangladeshFlag /> : null}
              {code}
            </button>
          ))}
        </div>

        <label className="auth-pill">
          <span className="auth-pill-icon">
            <PhoneIcon />
          </span>
          <span className="auth-pill-prefix">{phonePrefix}</span>
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder={a.phoneNumber}
            disabled={formDisabled}
            className="auth-pill-input"
          />
        </label>

        <AuthPillInput
          icon={<UserIcon />}
          autoComplete="username"
          value={username}
          onChange={setUsername}
          placeholder={a.enterUsername}
          disabled={formDisabled}
        />
        <AuthPillPassword
          value={password}
          onChange={setPassword}
          placeholder={a.enterPassword}
          autoComplete="new-password"
          disabled={formDisabled}
        />
        <AuthGoldButton loading={loading} disabled={formDisabled}>
          {a.signUpButton}
        </AuthGoldButton>
      </form>
    </AuthCard>
  );
}
