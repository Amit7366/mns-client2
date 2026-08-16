/** Footer link configs for CV666-style site footer. */

export const footerGameCenterItems = [
  { id: "hotGames", hrefKind: "exclusive" as const },
  { id: "favorites", hrefKind: "exclusive" as const },
  { id: "slots", hrefKind: "slot" as const },
  { id: "live", hrefKind: "casino" as const },
  { id: "sports", hrefKind: "sports" as const },
  { id: "esports", hrefKind: "arcade" as const },
  { id: "poker", hrefKind: "table" as const },
  { id: "fishing", hrefKind: "fishing" as const },
  { id: "lottery", hrefKind: "lottery" as const },
] as const;

/** Display names for partner logo grid (reference-style). */
export const footerPartnerLogos = [
  { id: "pg", label: "PG" },
  { id: "pragmatic", label: "PP" },
  { id: "jili", label: "JILI" },
  { id: "spribe", label: "SPRIBE" },
  { id: "fachai", label: "FC" },
  { id: "evolution", label: "EVO" },
  { id: "jdb", label: "JDB" },
  { id: "microgaming", label: "MG" },
  { id: "spadegaming", label: "SPADE" },
  { id: "hacksaw", label: "HS" },
  { id: "playngo", label: "PNG" },
  { id: "ezugi", label: "EZUGI" },
  { id: "rich88", label: "R88" },
  { id: "cq9", label: "CQ9" },
  { id: "yellowBat", label: "YB" },
  { id: "fastspin", label: "FS" },
  { id: "nextspin", label: "NS" },
  { id: "evoplay", label: "EVOP" },
  { id: "relaxgaming", label: "RELAX" },
  { id: "playtech", label: "PT" },
  { id: "dreamgaming", label: "DG" },
  { id: "bti", label: "BTI" },
  { id: "turbogames", label: "TURBO" },
  { id: "galaxsys", label: "GAL" },
  { id: "creedroomz", label: "CR" },
  { id: "auragaming", label: "AURA" },
  { id: "inout", label: "INOUT" },
  { id: "funkygames", label: "FUNKY" },
] as const;

/** Legacy exports kept for any remaining imports. */
export const footerGamingLinks = [
  "casino",
  "slots",
  "crash",
  "table",
  "fishing",
  "arcade",
  "lottery",
] as const;

export const footerAboutLinks = [
  { id: "aboutUs", external: true },
  { id: "privacyPolicy", external: true },
  { id: "terms", external: true },
  { id: "responsibleGaming", external: true },
  { id: "kyc", external: true },
] as const;

export const footerFeatureLinks = [
  { id: "promotions", external: false },
  { id: "vipClub", external: false },
  { id: "referral", external: false },
  { id: "brandAmbassadors", external: false },
  { id: "appDownload", external: false },
] as const;

export const footerHelpLinks = [{ id: "bjForum", external: true }] as const;

export const sponsorshipItems = [
  { id: "quettaGladiators", color: "#7c3aed", initials: "QG" },
  { id: "sunrisersEasternCape", color: "#f59e0b", initials: "SEC" },
  { id: "deccanGladiators", color: "#2563eb", initials: "DG" },
  { id: "stKittsPatriots", color: "#dc2626", initials: "SKN" },
  { id: "biratnagarKings", color: "#16a34a", initials: "BK" },
] as const;

export const ambassadorItems = [
  { id: "miaKhalifa", mark: "MK" },
  { id: "kevinPietersen", mark: "KP" },
  { id: "amyJackson", mark: "AJ" },
  { id: "hansikaMotwani", mark: "HM" },
  { id: "wasimAkram", mark: "WA" },
  { id: "keyaAkterPayel", mark: "KAP" },
  { id: "yeshaSagar", mark: "YS" },
] as const;
