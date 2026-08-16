/** Grid tiles for the CV666-style full sidebar drawer. */

export type SidebarGridItem = {
  id: string;
  /** Icon accent family matching the reference */
  tone: "coral" | "gold" | "sky" | "green";
  /** Routing kind handled in SideNavigation / sidebar-routes */
  action:
    | "lobby"
    | "page"
    | "member"
    | "locale"
    | "home"
    | "download"
    | "liveChat";
  /** Extra route key when action needs one */
  routeKey?: string;
};

/**
 * Order matches the reference images (2-col, left→right, top→bottom).
 */
export const sidebarGridItems: SidebarGridItem[] = [
  { id: "hotGames", tone: "coral", action: "lobby", routeKey: "exclusive" },
  { id: "inviteFriends", tone: "sky", action: "page", routeKey: "referral" },
  { id: "favorites", tone: "coral", action: "lobby", routeKey: "exclusive" },
  { id: "offers", tone: "gold", action: "page", routeKey: "promotion" },
  { id: "slots", tone: "coral", action: "lobby", routeKey: "slot" },
  { id: "rewardCenter", tone: "gold", action: "member", routeKey: "reward-center" },
  { id: "live", tone: "coral", action: "lobby", routeKey: "casino" },
  { id: "rebate", tone: "gold", action: "member", routeKey: "rebate" },
  { id: "sports", tone: "coral", action: "lobby", routeKey: "sports" },
  { id: "vip", tone: "gold", action: "page", routeKey: "vip" },
  { id: "esports", tone: "coral", action: "lobby", routeKey: "arcade" },
  { id: "mission", tone: "gold", action: "member", routeKey: "mission" },
  { id: "poker", tone: "coral", action: "lobby", routeKey: "table" },
  { id: "language", tone: "sky", action: "locale" },
  { id: "fishing", tone: "coral", action: "lobby", routeKey: "fishing" },
  { id: "appDownload", tone: "green", action: "download" },
  { id: "lottery", tone: "coral", action: "lobby", routeKey: "lottery" },
  { id: "customerService", tone: "green", action: "liveChat" },
];

/** Legacy list exports kept for any remaining imports. */
export type SidebarSubItem = {
  id: string;
  accent?: string;
};

export type SidebarMenuItem = {
  id: string;
  kind?: "link" | "dropdown" | "external";
  externalUrl?: string;
  showViewAll?: boolean;
  subItems?: SidebarSubItem[];
};

export const sidebarPrimaryItems: SidebarMenuItem[] = [];
export const sidebarSecondaryItems: SidebarMenuItem[] = [];
export const sidebarMenuItems: SidebarMenuItem[] = [];
