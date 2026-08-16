/** CV666-style theme class tokens for client-template2. */

/** Centered site column — keeps large side margins on desktop (reference layout). */
export const SITE_MAX_WIDTH = "max-w-[1080px]";

export const siteShellClass = `mx-auto w-full ${SITE_MAX_WIDTH} px-3 sm:px-4`;

export const theme = {
  bg: "bg-[var(--bg)]",
  bgDeep: "bg-[var(--bg-deep)]",
  bgHeader: "bg-[var(--bg-header)]",
  surface: "bg-[var(--surface)]",
  surfaceElevated: "bg-[var(--surface-elevated)]",
  surfaceCard: "bg-[var(--surface-card)]",
  border: "border-[var(--border)]",
  gold: "text-[var(--gold)]",
  cyan: "text-[var(--cyan)]",
  text: "text-[var(--text)]",
  muted: "text-[var(--text-muted)]",
} as const;
