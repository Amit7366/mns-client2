import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import FloatingSocialStack from "@/components/FloatingSocialStack";
import FloatingPromoRail from "@/components/home/FloatingPromoRail";
import HeroSlider from "@/components/HeroSlider";
import HomePromoGate from "@/components/home-promo/HomePromoGate";
import HomeSpinWheelGate from "@/components/spin-wheel/HomeSpinWheelGate";
import HomeCategoryIconBar from "@/components/home/HomeCategoryIconBar";
import HomeGameSection from "@/components/home/HomeGameSection";
import JackpotBanner from "@/components/home/JackpotBanner";
import HomeJsonLd from "@/components/seo/HomeJsonLd";
import { fetchExclusiveSlides, fetchPopularGames, fetchVendorGames } from "@/lib/games-api";
import type { GameTile } from "@/lib/game-tile";
import { popularGames as fallbackPopularGames } from "@/lib/home-games-data";
import { exclusiveCarouselSlides as fallbackExclusiveSlides } from "@/lib/home-carousel-data";
import { isValidLocale, type Locale } from "@/lib/locale";
import { getMessages } from "@/lib/i18n/messages";
import { buildHomeMetadata } from "@/lib/seo/home-metadata";
import { lobbyCategoryHref, type LobbyKind } from "@/lib/vendor-routes";
import { resolveGameImage } from "@/lib/vendor-games-data";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const CATEGORY_SECTIONS: { kind: LobbyKind; titleKey: string; limit: number }[] = [
  { kind: "slot", titleKey: "slots", limit: 10 },
  { kind: "casino", titleKey: "casino", limit: 5 },
  { kind: "sports", titleKey: "sports", limit: 5 },
  { kind: "arcade", titleKey: "esports", limit: 4 },
  { kind: "table", titleKey: "table", limit: 10 },
  { kind: "fishing", titleKey: "fishing", limit: 10 },
  { kind: "lottery", titleKey: "lottery", limit: 5 },
];

async function loadCategoryGames(kind: LobbyKind): Promise<GameTile[]> {
  try {
    const games = await fetchVendorGames({ category: kind });
    return games.map((g) => ({
      ...g,
      image: resolveGameImage(
        (g as GameTile & { game_image?: string }).game_image,
        g.image,
      ),
    }));
  } catch (error) {
    console.error(`Failed to load ${kind} games:`, error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam) ? localeParam : "bn";
  return buildHomeMetadata(locale);
}

export default async function Home({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam) ? localeParam : "bn";
  const t = getMessages(locale);

  let popularGames = fallbackPopularGames;

  try {
    const [popular, exclusive] = await Promise.all([
      fetchPopularGames(),
      fetchExclusiveSlides(),
    ]);
    popularGames = popular;
    void exclusive;
    void fallbackExclusiveSlides;
  } catch (error) {
    console.error("Failed to load home game data from API, using fallback:", error);
  }

  const categoryResults = await Promise.all(
    CATEGORY_SECTIONS.map(async (section) => ({
      ...section,
      games: await loadCategoryGames(section.kind),
    })),
  );

  function sectionTitle(titleKey: string): string {
    if (titleKey === "esports") return t.home.esportsTitle;
    if (titleKey === "slots") return t.home.tabs.slots;
    if (titleKey === "casino") return t.home.tabs.live ?? t.home.tabs.casino;
    return t.home.tabs[titleKey] ?? titleKey;
  }

  return (
    <>
      <HomeJsonLd locale={locale} />
      <HomePromoGate />
      <HomeSpinWheelGate />
      <AnnouncementBar />
      <HeroSlider />
      <HomeCategoryIconBar />
      <HomeGameSection
        title={t.home.hotGamesTitle}
        seeAllHref={lobbyCategoryHref(locale, "exclusive")}
        games={popularGames}
        ribbon="hot"
        limit={10}
      />
      <JackpotBanner
        games={
          categoryResults.find((section) => section.kind === "slot")?.games ??
          popularGames
        }
      />
      {categoryResults.map((section) => (
        <HomeGameSection
          key={section.kind}
          title={sectionTitle(section.titleKey)}
          seeAllHref={lobbyCategoryHref(locale, section.kind)}
          games={section.games}
          limit={section.limit}
        />
      ))}
      <FloatingPromoRail />
      <FloatingSocialStack />
    </>
  );
}
