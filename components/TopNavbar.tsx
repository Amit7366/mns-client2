"use client";

import Link from "next/link";
import LocaleMenuButton from "./LocaleMenuButton";
import LoggedInWalletBar from "./nav/LoggedInWalletBar";
import ProfileDropdown from "./profile/ProfileDropdown";
import { useAuth } from "./AuthProvider";
import { useLocale } from "./LocaleProvider";
import { siteShellClass } from "@/lib/theme";

function MenuIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
      <rect y="0" width="18" height="2" rx="1" fill="var(--gold)" />
      <rect y="6" width="18" height="2" rx="1" fill="var(--gold)" />
      <rect y="12" width="18" height="2" rx="1" fill="var(--gold)" />
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
        className="h-9 w-[9.5rem] shrink-0 animate-pulse rounded-md bg-[var(--surface)] sm:w-[11rem]"
        aria-hidden
      />
    );
  }

  if (isUser) {
    return <LoggedInWalletBar />;
  }

  return (
    <>
      <Link
        href={`/${locale}/login`}
        className="focus-ring btn-cyan flex h-9 min-w-[4.5rem] sm:min-w-[5rem]"
      >
        {t.login}
      </Link>
      <Link
        href={`/${locale}/register`}
        className="focus-ring btn-gold flex h-9 min-w-[4.5rem] sm:min-w-[5rem]"
      >
        {t.signUp}
      </Link>
    </>
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
    <header className="sticky top-0 z-50 w-full shrink-0 border-b border-[var(--border)] bg-[var(--bg-header)] pt-[env(safe-area-inset-top)]">
      <nav className={`flex h-[52px] items-center justify-between gap-2 ${siteShellClass}`}>
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 lg:gap-4">
          {!isAuthVariant ? (
            <button
              type="button"
              aria-label={t.ui.openMenu}
              aria-expanded={menuOpen}
              onClick={onMenuClick}
              className={`focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors ${
                menuOpen
                  ? "bg-[var(--surface-elevated)]"
                  : "bg-[var(--surface)] hover:bg-[var(--surface-elevated)]"
              }`}
            >
              <MenuIcon />
            </button>
          ) : null}

          <Link
            href={`/${locale}`}
            className="focus-ring flex shrink-0 items-center rounded-md text-[20px] font-bold tracking-tight sm:text-[22px]"
          >
            <span className="text-[var(--gold)]">BK</span>
            <span className="text-white">Baji</span>
          </Link>

          {!isAuthVariant && authReady && isUser ? (
            <div className="hidden min-w-0 items-center gap-0.5 lg:flex">
              <ProfileDropdown menuAlign="start" />
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 lg:gap-3">
          {isAuthVariant ? null : <NavbarAuthActions />}
          <LocaleMenuButton />
        </div>
      </nav>
    </header>
  );
}
