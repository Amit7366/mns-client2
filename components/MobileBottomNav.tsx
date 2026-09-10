"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useLocale } from "./LocaleProvider";
import { getBottomNavMessages } from "@/lib/i18n/bottom-nav-messages";
import { memberCenterHref, memberRewardCenterHref } from "@/lib/member-routes";

const ICON_COLOR = "#7ee8c8";
const ICON_ACTIVE = "#f5c518";

function HomeIcon({ active }: { active: boolean }) {
  const c = active ? ICON_ACTIVE : ICON_COLOR;
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <path
        d="M4 12.2L13 4.5l9 7.7V21a1.5 1.5 0 01-1.5 1.5h-5.2v-6.2h-5.6V22.5H5.5A1.5 1.5 0 014 21V12.2z"
        stroke={c}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill={active ? "rgba(245,197,24,0.18)" : "none"}
      />
    </svg>
  );
}

function PromotionIcon({ active }: { active: boolean }) {
  const c = active ? ICON_ACTIVE : ICON_COLOR;
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <rect x="5" y="11" width="16" height="11" rx="1.6" stroke={c} strokeWidth="1.8" />
      <path d="M13 11v11M5 15.5h16" stroke={c} strokeWidth="1.6" />
      <path
        d="M13 11c-2.2 0-4-1.2-4-2.7S10.6 5.6 13 7.4c2.4-1.8 4-.4 4 1.9S15.2 11 13 11z"
        stroke={c}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InviteIcon({ active }: { active: boolean }) {
  const c = active ? ICON_ACTIVE : ICON_COLOR;
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <circle cx="13" cy="8.2" r="3.1" stroke={c} strokeWidth="1.7" />
      <circle cx="6.4" cy="10.2" r="2.3" stroke={c} strokeWidth="1.6" />
      <circle cx="19.6" cy="10.2" r="2.3" stroke={c} strokeWidth="1.6" />
      <path d="M8.2 18.8c.4-2.6 2.4-4.2 4.8-4.2s4.4 1.6 4.8 4.2" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4.4 19.4c.3-1.8 1.5-3 3.1-3.2" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M21.6 19.4c-.3-1.8-1.5-3-3.1-3.2" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function RewardIcon({ active }: { active: boolean }) {
  const c = active ? ICON_ACTIVE : ICON_COLOR;
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <rect x="4.5" y="11" width="17" height="10.5" rx="1.8" stroke={c} strokeWidth="1.8" />
      <path d="M4.5 15.2h17" stroke={c} strokeWidth="1.6" />
      <path d="M13 11v10.5" stroke={c} strokeWidth="1.6" />
      <path
        d="M9.2 7.2c0-1.5 1.2-2.6 2.6-2.2.6.2 1.2.8 1.2 1.6 0 .9-.5 1.6-1.2 2.2H9.8C9.4 8.4 9.2 7.8 9.2 7.2z"
        stroke={c}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16.8 7.2c0-1.5-1.2-2.6-2.6-2.2-.6.2-1.2.8-1.2 1.6 0 .9.5 1.6 1.2 2.2h2c.4-.4.6-1 .6-1.6z"
        stroke={c}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MemberIcon({ active }: { active: boolean }) {
  const c = active ? ICON_ACTIVE : ICON_COLOR;
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <circle cx="13" cy="9" r="3.4" stroke={c} strokeWidth="1.8" />
      <path
        d="M5.8 21c.8-4.2 3.5-6.4 7.2-6.4s6.4 2.2 7.2 6.4"
        stroke={c}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

type NavItemProps = {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
};

function NavItem({ active, label, icon, onClick, href }: NavItemProps) {
  const className = `relative flex min-h-[58px] flex-1 flex-col items-center justify-center gap-0.5 px-0.5 pt-1.5 pb-1 ${
    active ? "text-[#f5c518]" : "text-[#7ee8c8]"
  }`;

  const content = (
    <>
      {active ? (
        <span className="absolute inset-x-4 top-0 h-[3px] rounded-full bg-[#f5c518]" aria-hidden />
      ) : null}
      <span className="flex h-7 w-7 items-center justify-center">{icon}</span>
      <span className="max-w-full truncate text-[11px] font-semibold leading-tight">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} aria-current={active ? "page" : undefined}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} aria-label={label}>
      {content}
    </button>
  );
}

type MobileBottomNavProps = {
  onMenuClick?: () => void;
  menuOpen?: boolean;
  profileOpen?: boolean;
  onProfileClick?: () => void;
  onProfileClose?: () => void;
};

export default function MobileBottomNav(_props: MobileBottomNavProps) {
  const { preferences, t } = useLocale();
  const { isUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const locale = preferences.locale;
  const base = `/${locale}`;
  const labels = getBottomNavMessages(locale);

  const isHome = /^\/(bn|en|hi)\/?$/.test(pathname);
  const isPromotion = pathname === `${base}/promotion` || pathname.startsWith(`${base}/promotion/`);
  const isInvite =
    pathname === `${base}/referral` ||
    pathname.startsWith(`${base}/referral/`) ||
    pathname.includes("/my-referral");
  const isReward = pathname.includes("/reward-center");
  const isMember =
    (pathname === `${base}/member` || pathname.startsWith(`${base}/member/`)) && !isReward && !isInvite;

  function goAuthed(href: string) {
    if (!isUser) {
      router.push(`/${locale}/login?next=${encodeURIComponent(href)}`);
      return;
    }
    router.push(href);
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 rounded-t-[22px] border-t border-[#1a6b63] bg-[#043834] pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,0.35)] lg:hidden"
      aria-label={t.ui.bottomNavigation}
    >
      <div className="mx-auto flex w-full max-w-lg items-stretch">
        <NavItem
          active={isHome}
          label={labels.home}
          icon={<HomeIcon active={isHome} />}
          href={base}
        />
        <NavItem
          active={isPromotion}
          label={labels.promotion}
          icon={<PromotionIcon active={isPromotion} />}
          href={`${base}/promotion`}
        />
        <NavItem
          active={isInvite}
          label={labels.invite}
          icon={<InviteIcon active={isInvite} />}
          onClick={() => goAuthed(`/${locale}/referral`)}
        />
        <NavItem
          active={isReward}
          label={labels.reward}
          icon={<RewardIcon active={isReward} />}
          onClick={() => goAuthed(memberRewardCenterHref(locale))}
        />
        <NavItem
          active={isMember}
          label={labels.member}
          icon={<MemberIcon active={isMember} />}
          onClick={() => goAuthed(memberCenterHref(locale))}
        />
      </div>
    </nav>
  );
}
