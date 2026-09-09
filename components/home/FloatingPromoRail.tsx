"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { useLocale } from "@/components/LocaleProvider";
import { getFloatingPromoMessages } from "@/lib/i18n/floating-promo-messages";
import {
  memberBonusRewardHref,
  memberRewardCenterHref,
  memberSignInRewardHref,
} from "@/lib/member-routes";
import { openSpinWheel } from "@/lib/spin-wheel-events";

const CLOSED_KEY = "bkbaji.promoRail.closed";
const COLLAPSED_KEY = "bkbaji.promoRail.collapsed";

const PROMO_ITEMS = [
  { id: "egg", src: "/egg.gif", go: "signIn" },
  { id: "wheel", src: "/wheel.gif", go: "spin" },
  { id: "prize", src: "/prize.gif", go: "reward" },
  { id: "card", src: "/card.gif", go: "bonus" },
] as const;

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
    >
      <path
        d="M4.5 6.5L9 11l4.5-4.5"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 3.8L9 8.3l4.5-4.5"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 2l6 6M8 2L2 8" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function FloatingPromoRail() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { preferences } = useLocale();
  const locale = preferences.locale;
  const m = getFloatingPromoMessages(locale);
  const [ready, setReady] = useState(false);
  const [closed, setClosed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setClosed(sessionStorage.getItem(CLOSED_KEY) === "1");
      setCollapsed(localStorage.getItem(COLLAPSED_KEY) === "1");
    } catch {
      // Ignore storage errors
    }
    setReady(true);
  }, []);

  const persistCollapsed = useCallback((value: boolean) => {
    setCollapsed(value);
    try {
      localStorage.setItem(COLLAPSED_KEY, value ? "1" : "0");
    } catch {
      // Ignore storage errors
    }
  }, []);

  const persistClosed = useCallback((value: boolean) => {
    setClosed(value);
    try {
      if (value) sessionStorage.setItem(CLOSED_KEY, "1");
      else sessionStorage.removeItem(CLOSED_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  function goMember(href: string) {
    if (!isAuthenticated) {
      router.push(`/${locale}/login?next=${encodeURIComponent(href)}`);
      return;
    }
    router.push(href);
  }

  function handleItem(go: (typeof PROMO_ITEMS)[number]["go"]) {
    if (go === "spin") {
      if (!isAuthenticated) {
        router.push(`/${locale}/login?next=${encodeURIComponent(`/${locale}`)}`);
        return;
      }
      openSpinWheel();
      return;
    }
    if (go === "signIn") {
      goMember(memberSignInRewardHref(locale));
      return;
    }
    if (go === "reward") {
      goMember(memberRewardCenterHref(locale));
      return;
    }
    goMember(memberBonusRewardHref(locale));
  }

  if (!ready) return null;

  if (closed) {
    return (
      <div className="pointer-events-none fixed right-0 top-[46%] z-[36] -translate-y-1/2 pr-[max(0px,env(safe-area-inset-right))]">
        <button
          type="button"
          onClick={() => {
            persistClosed(false);
            persistCollapsed(false);
          }}
          aria-label={m.expand}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-l-full rounded-r-none bg-[#ff7a18] shadow-[0_3px_10px_rgba(0,0,0,0.4)] sm:h-11 sm:w-11"
        >
          <ChevronIcon collapsed />
        </button>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed right-0 top-[46%] z-[36] -translate-y-1/2 pr-[max(0px,env(safe-area-inset-right))]">
      <div className="pointer-events-auto relative flex flex-col items-center">
        {!collapsed ? (
          <button
            type="button"
            onClick={() => persistClosed(true)}
            aria-label={m.close}
            className="absolute -left-3 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#cfd3d8] shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
          >
            <CloseIcon />
          </button>
        ) : null}

        <button
          type="button"
          onClick={() => persistCollapsed(!collapsed)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? m.expand : m.collapse}
          className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff7a18] shadow-[0_3px_10px_rgba(0,0,0,0.4)] sm:h-11 sm:w-11"
        >
          <ChevronIcon collapsed={collapsed} />
        </button>

        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
            collapsed ? "max-h-0 opacity-0" : "max-h-[28rem] opacity-100"
          }`}
        >
          <div className="-mt-5 flex w-[58px] flex-col items-center rounded-[28px] bg-black/70 pb-1.5 pt-6 shadow-[0_8px_24px_rgba(0,0,0,0.45)] sm:w-[66px] sm:pt-7">
            {PROMO_ITEMS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItem(item.go)}
                aria-label={m[item.id]}
                className="flex h-[58px] w-full items-center justify-center px-0.5 sm:h-[64px]"
              >
                {/* GIFs stay animated with a native img */}
                <img
                  src={item.src}
                  alt=""
                  width={56}
                  height={56}
                  className="promo-rail-bob h-[50px] w-[50px] object-contain sm:h-[56px] sm:w-[56px]"
                  style={{ animationDelay: `${index * 0.18}s` }}
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
