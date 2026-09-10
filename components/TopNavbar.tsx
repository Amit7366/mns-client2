"use client";

import Image from "next/image";
import Link from "next/link";
import LocaleMenuButton from "./LocaleMenuButton";
import LoggedInWalletBar from "./nav/LoggedInWalletBar";
import ProfileDropdown from "./profile/ProfileDropdown";
import { useAuth } from "./AuthProvider";
import { useLocale } from "./LocaleProvider";
import { siteShellClass } from "@/lib/theme";

function MenuIcon() {
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden>
      <path
        d="M7.5 2.2L2.4 6.5l5.1 4.3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 6.5h8.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M11 11.4h8.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M2.4 15.6h16.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function NavbarAuthActions() {
  const { preferences, t } = useLocale();
  const { isUser, authReady } = useAuth();
  const locale = preferences.locale;

  if (!authReady) {
    return (
      <div
        className="h-7 w-[6.75rem] shrink-0 animate-pulse rounded-md bg-[var(--surface)] sm:h-9 sm:w-[11rem]"
        aria-hidden
      />
    );
  }

  if (isUser) {
    return <LoggedInWalletBar />;
  }

  return (
    <div className="flex shrink-0 items-center gap-1 sm:gap-3">
      <Link
        href={`/${locale}/login`}
        className="focus-ring inline-flex h-7 shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] px-2 text-[10px] font-extrabold leading-none sm:h-10 sm:rounded-[14px] sm:px-4 sm:text-[14px]"
        style={{
          color: "#e8b56a",
          textShadow: "1px 1px 0 rgba(32, 16, 6, 0.85)",
          backgroundImage: "linear-gradient(180deg, #4e7f7c 0%, #3a686c 50%, #2d5456 100%)",
          border: "1px solid #2a4c4e",
          boxShadow:
            "inset 0 1px 0 rgba(190, 230, 220, 0.28), inset 0 -2px 3px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.35)",
        }}
      >
        {t.login}
      </Link>
      <Link
        href={`/${locale}/register`}
        className="focus-ring inline-flex h-7 shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] px-2 text-[10px] font-extrabold leading-none sm:h-10 sm:rounded-[14px] sm:px-4 sm:text-[14px]"
        style={{
          color: "#8a3f14",
          textShadow: "0 1px 0 rgba(255, 236, 160, 0.55)",
          backgroundImage: "linear-gradient(180deg, #ffe98a 0%, #ffd24a 45%, #f0b01e 100%)",
          border: "1px solid #f5c44a",
          boxShadow:
            "inset 0 1px 0 #fff8d0, inset 0 -2px 0 #d49212, 0 2px 4px rgba(0, 0, 0, 0.35)",
        }}
      >
        {t.signUp}
      </Link>
    </div>
  );
}

export default function TopNavbar({
  onMenuClick,
  menuOpen,
  variant = "full",
}: {
  onMenuClick?: () => void;
  menuOpen?: boolean;
  variant?: "full" | "auth";
}) {
  const { preferences, t } = useLocale();
  const { isUser, authReady } = useAuth();
  const locale = preferences.locale;
  const isAuthVariant = variant === "auth";

  return (
    <header className="site-topbar sticky top-0 z-50 w-full shrink-0 border-b border-[var(--border)] bg-[var(--bg-header)] pt-[env(safe-area-inset-top)]">
      <nav className={`flex min-h-[48px] items-center justify-between gap-1 py-1 sm:min-h-[60px] sm:gap-2 sm:py-2.5 ${siteShellClass}`}>
        <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-3 lg:gap-4">
          {!isAuthVariant ? (
            <button
              type="button"
              aria-label={t.ui.openMenu}
              aria-expanded={menuOpen}
              onClick={onMenuClick}
              className="focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-transparent text-white sm:h-10 sm:w-10"
            >
              <MenuIcon />
            </button>
          ) : null}

          <Link
            href={`/${locale}`}
            className="focus-ring flex min-w-0 items-center rounded-md"
          >
            <Image
              src="/bkbaji-wintk-logo.png"
              alt="BKBaji"
              width={211}
              height={36}
              priority
              className="h-[18px] w-auto max-w-[6.6rem] object-contain object-left sm:h-8 sm:max-w-none lg:h-9"
            />
          </Link>

          {!isAuthVariant && authReady && isUser ? (
            <div className="hidden min-w-0 items-center gap-0.5 lg:flex">
              <ProfileDropdown menuAlign="start" />
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1.5 lg:gap-3">
          {isAuthVariant ? null : <NavbarAuthActions />}
          <LocaleMenuButton />
        </div>
      </nav>
    </header>
  );
}
