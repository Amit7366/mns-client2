"use client";

import Link from "next/link";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { useLocale } from "@/components/LocaleProvider";
import { lobbyCategoryHref, type LobbyKind } from "@/lib/vendor-routes";

type CategoryItem = {
  id: string;
  hrefKind: LobbyKind | "home";
};

const CATEGORY_ITEMS: CategoryItem[] = [
  { id: "hotGames", hrefKind: "exclusive" },
  { id: "favorites", hrefKind: "exclusive" },
  { id: "slots", hrefKind: "slot" },
  { id: "live", hrefKind: "casino" },
  { id: "sports", hrefKind: "sports" },
  { id: "esports", hrefKind: "arcade" },
  { id: "poker", hrefKind: "table" },
  { id: "fish", hrefKind: "fishing" },
  { id: "lottery", hrefKind: "lottery" },
];

const LABELS: Record<string, { en: string; bn: string; hi: string }> = {
  hotGames: { en: "HOT GAMES", bn: "HOT GAMES", hi: "HOT GAMES" },
  favorites: { en: "FAVORITES", bn: "FAVORITES", hi: "FAVORITES" },
  slots: { en: "SLOTS", bn: "SLOTS", hi: "SLOTS" },
  live: { en: "LIVE", bn: "LIVE", hi: "LIVE" },
  sports: { en: "SPORTS", bn: "SPORTS", hi: "SPORTS" },
  esports: { en: "E-SPORTS", bn: "E-SPORTS", hi: "E-SPORTS" },
  poker: { en: "POKER", bn: "POKER", hi: "POKER" },
  fish: { en: "FISH", bn: "FISH", hi: "FISH" },
  lottery: { en: "LOTTERY", bn: "LOTTERY", hi: "LOTTERY" },
};

function CategoryIcon({ id }: { id: string }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 28 28",
    fill: "none",
    "aria-hidden": true as const,
  };

  switch (id) {
    case "hotGames":
      return (
        <svg {...common}>
          <path
            d="M14 3c1.5 3.2.8 5.5-.8 7.2 3.2-.6 6.3 1.8 6.3 5.6A6.5 6.5 0 1110 9.5c-.5 2.2 1 3.8 2.4 4.6C12 10.2 12.8 6.8 14 3z"
            fill="white"
          />
          <path d="M12.2 19.2c0 1.4 1 2.8 1.8 2.8s1.8-1.4 1.8-2.8c0-1.5-1-2.6-1.8-3.4-.8.8-1.8 1.9-1.8 3.4z" fill="#0a3d3d" />
        </svg>
      );
    case "favorites":
      return (
        <svg {...common}>
          <path d="M6 8h14a1.5 1.5 0 011.5 1.5V22H6a1.5 1.5 0 01-1.5-1.5V9.5A1.5 1.5 0 016 8z" fill="white" />
          <path d="M8 8V6.5A2.5 2.5 0 0110.5 4H12l1.5 2.5H20" stroke="white" strokeWidth="1.6" fill="none" />
          <path
            d="M14 12.8c-.9-1-2.4-.2-2.4 1.1 0 1.2 1.1 2.1 2.4 3.1 1.3-1 2.4-1.9 2.4-3.1 0-1.3-1.5-2.1-2.4-1.1z"
            fill="#0a3d3d"
          />
        </svg>
      );
    case "slots":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="22" height="18" rx="3" fill="white" />
          <rect x="6" y="8" width="4.5" height="12" rx="1" fill="#0a3d3d" />
          <rect x="11.75" y="8" width="4.5" height="12" rx="1" fill="#0a3d3d" />
          <rect x="17.5" y="8" width="4.5" height="12" rx="1" fill="#0a3d3d" />
          <text x="7.1" y="17" fill="white" fontSize="8" fontWeight="800">
            7
          </text>
          <text x="12.85" y="17" fill="white" fontSize="8" fontWeight="800">
            7
          </text>
          <text x="18.6" y="17" fill="white" fontSize="8" fontWeight="800">
            7
          </text>
        </svg>
      );
    case "live":
      return (
        <svg {...common}>
          <circle cx="14" cy="14" r="11" fill="white" />
          <circle cx="14" cy="14" r="6.5" fill="#0a3d3d" />
          <circle cx="14" cy="14" r="3" fill="white" />
          <circle cx="14" cy="14" r="1.2" fill="#0a3d3d" />
        </svg>
      );
    case "sports":
      return (
        <svg {...common}>
          <rect x="12" y="4" width="4" height="18" rx="1" fill="white" />
          <path d="M7 8h14" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M5 21h18" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="14" cy="14" r="2.2" fill="#0a3d3d" />
        </svg>
      );
    case "esports":
      return (
        <svg {...common}>
          <rect x="3" y="9" width="22" height="12" rx="4" fill="white" />
          <circle cx="10" cy="15" r="1.8" fill="#0a3d3d" />
          <path d="M9.2 13.5v3M8 15h2.4" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
          <circle cx="18" cy="13.5" r="1.1" fill="#0a3d3d" />
          <circle cx="20.5" cy="16" r="1.1" fill="#0a3d3d" />
        </svg>
      );
    case "poker":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="10" height="10" rx="2" fill="white" transform="rotate(14 9 10)" />
          <rect x="13" y="11" width="10" height="10" rx="2" fill="white" transform="rotate(-10 18 16)" />
          <circle cx="9" cy="10" r="1.2" fill="#0a3d3d" />
          <circle cx="18" cy="16" r="1.2" fill="#0a3d3d" />
        </svg>
      );
    case "fish":
      return (
        <svg {...common}>
          <path
            d="M3 16c3.5-7 11-9 16-5 2 1.2 3.5 1.6 5.5.8-1.5 2.5-4 4.2-7.5 4.2H5c-1.2 0-2.2-.4-2-.z"
            fill="white"
          />
          <circle cx="19" cy="13.5" r="1.2" fill="#0a3d3d" />
          <path d="M23 12l3-1.5M23 15.5l3 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "lottery":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="18" height="12" rx="2" fill="white" />
          <path d="M5 9h18" stroke="#0a3d3d" strokeWidth="1.2" opacity="0.35" />
          <circle cx="9" cy="22" r="2.6" fill="white" />
          <circle cx="14" cy="22" r="2.6" fill="white" />
          <circle cx="19" cy="22" r="2.6" fill="white" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="14" cy="14" r="8" fill="white" />
        </svg>
      );
  }
}

export default function HomeCategoryIconBar() {
  const { preferences } = useLocale();
  const locale = preferences.locale;

  function hrefFor(item: CategoryItem): string {
    if (item.hrefKind === "home") return `/${locale}`;
    return lobbyCategoryHref(locale, item.hrefKind);
  }

  function labelFor(id: string): string {
    const entry = LABELS[id];
    if (!entry) return id;
    if (locale === "bn") return entry.bn;
    if (locale === "hi") return entry.hi;
    return entry.en;
  }

  return (
    <section className="home-category-bar w-full py-3">
      <Swiper
        modules={[FreeMode]}
        freeMode={{ enabled: true, momentumRatio: 0.65 }}
        slidesPerView="auto"
        spaceBetween={8}
        className="!overflow-visible"
      >
        {CATEGORY_ITEMS.map((item) => (
          <SwiperSlide key={item.id} className="!w-auto">
            <Link
              href={hrefFor(item)}
              className="focus-ring flex h-[72px] w-[78px] flex-col items-center justify-center gap-1 rounded-xl bg-[#0a4545] px-1.5 text-center transition-colors hover:bg-[#0d5252] active:scale-[0.98] sm:h-[80px] sm:w-[88px] sm:rounded-[14px]"
            >
              <CategoryIcon id={item.id} />
              <span className="max-w-full truncate text-[9px] font-bold uppercase tracking-wide text-white sm:text-[10px]">
                {labelFor(item.id)}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
