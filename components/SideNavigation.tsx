"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useLocale } from "./LocaleProvider";
import { sidebarGridItems, type SidebarGridItem } from "./sidebar-menu";
import {
  memberLiveChatHref,
  memberMissionHref,
  memberRebateHref,
  memberRewardCenterHref,
} from "@/lib/member-routes";
import { BKBAJI_ANDROID_APP_PATH } from "@/lib/seo/site-config";
import { openAuthModal } from "@/lib/auth-modal-events";
import { lobbyCategoryHref, type LobbyKind } from "@/lib/vendor-routes";

type SideNavigationProps = {
  expanded: boolean;
  onClose: () => void;
};

const CORAL = "#E85A3C";
const GOLD = "#E8B84A";
const SKY = "#5B9FD4";
const GREEN = "#2CB86E";

function toneColor(tone: SidebarGridItem["tone"]): string {
  if (tone === "gold") return GOLD;
  if (tone === "sky") return SKY;
  if (tone === "green") return GREEN;
  return CORAL;
}

function GridIcon({ id, tone }: { id: string; tone: SidebarGridItem["tone"] }) {
  const c = toneColor(tone);
  const common = { width: 20, height: 20, viewBox: "0 0 36 36", fill: "none", "aria-hidden": true as const };

  switch (id) {
    case "hotGames":
      return (
        <svg {...common}>
          <path
            d="M18 4c2 4 1 7-1 9 4-1 8 2 8 7a9 9 0 11-18 0c0-4 3-7 6-9-1 3 1 5 3 6 0-5 1-9 2-13z"
            fill={c}
          />
          <path d="M15 24c0 2 1.5 4 3 4s3-2 3-4c0-2-1.5-3.5-3-4.5-1.5 1-3 2.5-3 4.5z" fill="#F5C518" />
        </svg>
      );
    case "inviteFriends":
      return (
        <svg {...common}>
          <circle cx="12" cy="13" r="4" fill={c} />
          <circle cx="24" cy="13" r="4" fill={c} />
          <path
            d="M8 26c0-3.5 2.5-6 6-6h1c1.5 2.5 4.5 2.5 6 0h1c3.5 0 6 2.5 6 6"
            stroke={c}
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M14 18c2 1.5 6 1.5 8 0" stroke="#7EC8F0" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "affiliate":
      return (
        <svg {...common}>
          <circle cx="18" cy="8" r="4" fill={c} />
          <circle cx="8" cy="24" r="4" fill={c} />
          <circle cx="28" cy="24" r="4" fill={c} />
          <path
            d="M15 11.5L10.5 20.5M21 11.5l4.5 9M12 24h12"
            stroke="#7EC8F0"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "favorites":
      return (
        <svg {...common}>
          <path
            d="M8 10h16a2 2 0 012 2v14H8a2 2 0 01-2-2V12a2 2 0 012-2z"
            fill={c}
          />
          <path d="M10 10V8a3 3 0 013-3h2l2 3h7" stroke={c} strokeWidth="2" fill="none" />
          <path
            d="M18 16.5c-1.2-1.3-3.2-.3-3.2 1.4 0 1.6 1.5 2.8 3.2 4.1 1.7-1.3 3.2-2.5 3.2-4.1 0-1.7-2-2.7-3.2-1.4z"
            fill="#fff"
          />
        </svg>
      );
    case "offers":
      return (
        <svg {...common}>
          <rect x="9" y="14" width="18" height="14" rx="2" fill={c} />
          <path d="M9 18h18" stroke="#9A6B12" strokeWidth="2" />
          <path d="M18 14v14" stroke="#9A6B12" strokeWidth="2" />
          <path
            d="M14 14c-2.5 0-4-1.8-4-3.5S12 7 14 9c2-2 4-.8 4 1.5S16.5 14 14 14z"
            fill={c}
          />
          <path
            d="M22 14c-2.5 0-4-1.8-4-3.5S20 7 22 9c2-2 4-.8 4 1.5S24.5 14 22 14z"
            fill={c}
          />
        </svg>
      );
    case "slots":
      return (
        <svg {...common}>
          <rect x="5" y="8" width="26" height="20" rx="4" fill={c} />
          <rect x="8" y="11" width="6" height="14" rx="1.5" fill="#F5C518" />
          <rect x="15" y="11" width="6" height="14" rx="1.5" fill="#F5C518" />
          <rect x="22" y="11" width="6" height="14" rx="1.5" fill="#F5C518" />
          <text x="9.2" y="21.5" fill={c} fontSize="10" fontWeight="900">
            7
          </text>
          <text x="16.2" y="21.5" fill={c} fontSize="10" fontWeight="900">
            7
          </text>
          <text x="23.2" y="21.5" fill={c} fontSize="10" fontWeight="900">
            7
          </text>
        </svg>
      );
    case "rewardCenter":
      return (
        <svg {...common}>
          <circle cx="18" cy="18" r="11" fill={c} />
          <circle cx="18" cy="18" r="7" fill="#8B6914" />
          <path d="M18 12l1.8 3.6 4 .6-2.9 2.8.7 4L18 21.4 14.4 23l.7-4L12.2 16.2l4-.6L18 12z" fill="#FFE566" />
        </svg>
      );
    case "live":
      return (
        <svg {...common}>
          <circle cx="18" cy="18" r="12" fill={c} />
          <circle cx="18" cy="18" r="7" fill="#2a1a12" />
          <circle cx="18" cy="18" r="3.5" fill="#F5C518" />
          <circle cx="18" cy="18" r="1.5" fill="#fff" />
        </svg>
      );
    case "rebate":
      return (
        <svg {...common}>
          <rect x="7" y="10" width="22" height="16" rx="3" fill={c} />
          <path d="M11 16h6M11 20h10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M24 14l3 4-3 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 14l-3 4 3 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        </svg>
      );
    case "sports":
      return (
        <svg {...common}>
          <rect x="15" y="6" width="6" height="22" rx="1" fill={c} />
          <path d="M10 10h16" stroke={c} strokeWidth="3" strokeLinecap="round" />
          <path d="M8 26h20" stroke={c} strokeWidth="3" strokeLinecap="round" />
          <circle cx="18" cy="18" r="3" fill="#F5C518" />
        </svg>
      );
    case "vip":
      return (
        <svg {...common}>
          <path
            d="M18 5l3.5 7.5L30 14l-6 5.5L26 28l-8-4.5L10 28l2-8.5L6 14l8.5-1.5L18 5z"
            fill={c}
          />
          <path d="M18 12l1.5 3 3.2.4-2.3 2.2.6 3.2L18 19.2 15 20.8l.6-3.2-2.3-2.2 3.2-.4L18 12z" fill="#fff" />
        </svg>
      );
    case "esports":
      return (
        <svg {...common}>
          <rect x="5" y="12" width="26" height="14" rx="5" fill={c} />
          <circle cx="13" cy="19" r="2.2" fill="#fff" />
          <path d="M12 17v4M11 19h4" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="23" cy="17.5" r="1.4" fill="#F5C518" />
          <circle cx="26" cy="20.5" r="1.4" fill="#7EC8F0" />
        </svg>
      );
    case "mission":
      return (
        <svg {...common}>
          <circle cx="18" cy="18" r="12" stroke={c} strokeWidth="2.5" fill="none" />
          <circle cx="18" cy="18" r="7" stroke={c} strokeWidth="2.5" fill="none" />
          <circle cx="18" cy="18" r="2.5" fill={c} />
          <path d="M18 4v4M18 28v4M4 18h4M28 18h4" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "table":
    case "poker":
      return (
        <svg {...common}>
          <rect x="8" y="8" width="12" height="12" rx="2.5" fill={c} transform="rotate(12 14 14)" />
          <rect x="16" y="14" width="12" height="12" rx="2.5" fill="#F5C518" transform="rotate(-8 22 20)" />
          <circle cx="14" cy="13" r="1.5" fill="#fff" />
          <circle cx="22" cy="19" r="1.5" fill="#333" />
        </svg>
      );
    case "fishing":
      return (
        <svg {...common}>
          <path
            d="M6 20c4-8 12-10 18-6 2 1.5 4 2 6 1-2 3-5 5-9 5H8c-1.5 0-2.5-0.5-2-0z"
            fill={c}
          />
          <path d="M8 18c2-1 4-1 6 0" stroke="#7EC8F0" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="16" r="1.4" fill="#fff" />
          <path d="M28 14l4-2M28 18l4 2" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M10 22c1.5 2 4 3 7 2" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </svg>
      );
    case "lottery":
      return (
        <svg {...common}>
          <rect x="8" y="7" width="20" height="14" rx="2.5" fill={c} />
          <path d="M8 12h20" stroke="#fff" strokeWidth="1.5" opacity="0.35" />
          <circle cx="12" cy="27" r="3" fill={c} />
          <circle cx="18" cy="27" r="3" fill={c} />
          <circle cx="24" cy="27" r="3" fill={c} />
          <text x="10.5" y="29.2" fill="#fff" fontSize="5" fontWeight="700">
            7
          </text>
          <text x="16.5" y="29.2" fill="#fff" fontSize="5" fontWeight="700">
            2
          </text>
          <text x="22.5" y="29.2" fill="#fff" fontSize="5" fontWeight="700">
            9
          </text>
        </svg>
      );
    case "appDownload":
      return (
        <svg {...common}>
          <path
            d="M8 16c0-6 4.5-10 10-10s10 4 10 10c3 0 5 2 5 5s-2 5-5 5H11c-3.5 0-6-2.5-6-5.5 0-2.5 1.5-4.5 3-5z"
            fill={c}
          />
          <path d="M18 14v10" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M14 20l4 4 4-4" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "customerService":
      return (
        <svg {...common}>
          <path
            d="M10 16a8 8 0 0116 0v2a3 3 0 01-3 3h-1v-7a4 4 0 00-8 0v8h5"
            stroke={c}
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <rect x="14" y="20" width="10" height="8" rx="3" fill={c} />
          <circle cx="19" cy="24" r="1.2" fill="#fff" />
        </svg>
      );
    case "language":
      return (
        <svg {...common}>
          <circle cx="18" cy="18" r="14" fill="#006a4e" />
          <circle cx="20" cy="18" r="8" fill="#f42a41" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="18" cy="18" r="10" fill={c} />
        </svg>
      );
  }
}

function resolveHref(locale: string, item: SidebarGridItem): string | null {
  if (item.action === "home") return `/${locale}`;
  if (item.action === "locale" || item.action === "liveChat") return null;
  if (item.action === "external") return item.externalUrl ?? null;
  if (item.action === "download") return BKBAJI_ANDROID_APP_PATH;
  if (item.action === "page") {
    if (item.routeKey === "referral") return `/${locale}/referral`;
    if (item.routeKey === "promotion") return `/${locale}/promotion`;
    if (item.routeKey === "vip") return `/${locale}/vip`;
    return `/${locale}`;
  }
  if (item.action === "member") {
    if (item.routeKey === "reward-center") return memberRewardCenterHref(locale);
    if (item.routeKey === "rebate") return memberRebateHref(locale);
    if (item.routeKey === "mission") return memberMissionHref(locale);
    return `/${locale}/member`;
  }
  if (item.action === "lobby" && item.routeKey) {
    return lobbyCategoryHref(locale, item.routeKey as LobbyKind);
  }
  return `/${locale}`;
}

export default function SideNavigation({ expanded, onClose }: SideNavigationProps) {
  const { t, preferences, openModal } = useLocale();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const locale = preferences.locale;

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, onClose]);

  function handleMemberNav(href: string) {
    if (!isAuthenticated) {
      openAuthModal("login", href);
      return;
    }
    router.push(href);
  }

  function handleLocale() {
    openModal();
  }

  function handleLiveChat() {
    const href = memberLiveChatHref(locale);
    handleMemberNav(href);
  }

  return (
    <aside
      className={`flex h-full flex-col overflow-hidden bg-[#042c2c] transition-[width,transform] duration-300 ease-out max-lg:absolute max-lg:inset-y-0 max-lg:left-0 max-lg:z-30 max-lg:w-[220px] lg:relative lg:shrink-0 ${
        expanded
          ? "shadow-[4px_0_16px_rgba(0,0,0,0.25)] max-lg:translate-x-0 lg:w-[220px]"
          : "pointer-events-none max-lg:-translate-x-full lg:w-0"
      }`}
      aria-hidden={!expanded}
      aria-label={t.ui.menu}
      inert={!expanded}
    >
      <div className="flex h-full w-[220px] flex-col">
        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-2.5 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
          <div className="grid grid-cols-2 gap-2">
            {sidebarGridItems.map((item) => {
              const label = t.sidebar[item.id] ?? item.id;
              const href = resolveHref(locale, item);
              const tileClass =
                "focus-ring flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-xl bg-[#0a3d3d] px-2 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:bg-[#0f4a4a] active:scale-[0.98]";

              const content = (
                <>
                  <GridIcon id={item.id} tone={item.tone} />
                  <span className="max-w-full px-0.5 text-[12px] font-medium leading-snug text-white">
                    {label}
                  </span>
                </>
              );

              if (item.action === "locale") {
                return (
                  <button key={item.id} type="button" onClick={handleLocale} className={tileClass}>
                    {content}
                  </button>
                );
              }

              if (item.action === "liveChat") {
                return (
                  <button key={item.id} type="button" onClick={handleLiveChat} className={tileClass}>
                    {content}
                  </button>
                );
              }

              if (item.action === "external" && href) {
                return (
                  <a
                    key={item.id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={tileClass}
                  >
                    {content}
                  </a>
                );
              }

              if (item.action === "download" && href) {
                return (
                  <a key={item.id} href={href} download className={tileClass}>
                    {content}
                  </a>
                );
              }

              if (item.action === "member" && href) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMemberNav(href)}
                    className={tileClass}
                  >
                    {content}
                  </button>
                );
              }

              if (href) {
                return (
                  <Link key={item.id} href={href} className={tileClass}>
                    {content}
                  </Link>
                );
              }

              return (
                <button key={item.id} type="button" className={tileClass}>
                  {content}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
