import Link from "next/link";

export const MEMBER_PAGE_BG = "min-h-full bg-[var(--bg)]";

export const memberContainerNarrow = "mx-auto w-full max-w-lg px-3 sm:px-4";
export const memberContainerWide = "mx-auto w-full max-w-3xl px-3 sm:px-4 lg:px-6";
export const memberContainerProfile = "mx-auto w-full max-w-5xl px-3 sm:px-4 lg:px-6";
export const memberContainerXl = "mx-auto w-full max-w-6xl px-3 sm:px-4 lg:px-6";

export const memberCardBorder = "rounded-lg border border-[var(--border)] bg-[var(--bg-deep)]";
export const memberPanelBorder = "rounded-lg border border-[var(--border)] bg-[var(--bg-header)]";

/** Standard content padding; clears mobile bottom nav. */
export const memberPagePadding = "py-4 sm:py-5 pb-mobile-nav lg:pb-6";
export const memberPagePaddingNarrow = "py-5 sm:py-6 pb-mobile-nav lg:pb-8";
/** Forms with fixed submit footer. */
export const memberPagePaddingFormSticky = "py-5 sm:py-6 pb-28 lg:pb-8";

export const memberBtnPrimary =
  "focus-ring min-h-11 w-full rounded-md bg-[var(--gold)] px-4 py-3 text-[15px] font-semibold text-[#1a1400] transition-colors hover:bg-[var(--gold-hover)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45";

export const memberBtnSecondary =
  "focus-ring min-h-10 shrink-0 rounded-md border border-[var(--border-strong)] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:border-[var(--cyan)] hover:bg-[var(--cyan-muted)] disabled:cursor-not-allowed disabled:opacity-40";

export const memberBtnGhost =
  "focus-ring min-h-10 rounded-md bg-[var(--surface)] px-3 py-2 text-[12px] text-white transition-colors hover:bg-[var(--surface-elevated)] disabled:cursor-not-allowed disabled:opacity-40 sm:text-[13px]";

export const memberBtnDanger =
  "focus-ring min-h-10 rounded-md bg-[#e85d4a] px-3 py-2 text-[12px] font-medium text-white transition-colors hover:bg-[#d14a38] disabled:cursor-not-allowed disabled:opacity-40 sm:text-[13px]";

export const memberDateChipClass =
  "focus-ring rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[13px] font-medium text-[var(--text)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]";

export const memberRecordCardClass =
  "rounded-lg border border-[var(--border)] bg-[var(--surface-card)] px-4 py-4 sm:px-5";

export type MemberContainerWidth = "narrow" | "wide" | "profile" | "xl";

export function memberContainerFor(width: MemberContainerWidth): string {
  switch (width) {
    case "narrow":
      return memberContainerNarrow;
    case "wide":
      return memberContainerWide;
    case "profile":
      return memberContainerProfile;
    case "xl":
      return memberContainerXl;
    default:
      return memberContainerWide;
  }
}

export function MemberFieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 block text-[13px] leading-snug text-[var(--text-muted)] sm:text-[14px]">
      {children}
    </span>
  );
}

export function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M12.5 4.5L7 10l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MemberFilterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="text-[#a3a3a3]">
      <path d="M3 5h14M6 10h8M9 15h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="5" cy="5" r="1.5" fill="currentColor" />
      <circle cx="14" cy="10" r="1.5" fill="currentColor" />
      <circle cx="11" cy="15" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function MemberPageHeader({
  title,
  backHref,
  backLabel,
  trailing,
  wide,
  width,
  stackTrailing,
}: {
  title: string;
  backHref?: string;
  backLabel?: string;
  trailing?: React.ReactNode;
  /** Uses wide container when true (legacy). */
  wide?: boolean;
  width?: MemberContainerWidth;
  stackTrailing?: boolean;
}) {
  const resolvedWidth: MemberContainerWidth = width ?? (wide ? "wide" : "narrow");
  const container = memberContainerFor(resolvedWidth);

  return (
    <header className="sticky top-0 z-30 border-b border-[#1f1f1f] bg-[#0a0a0a]/95 backdrop-blur-sm supports-[backdrop-filter]:bg-[#0a0a0a]/90">
      <div className={`${container} py-2.5 sm:py-2`}>
        <div className="flex min-h-11 items-center gap-2">
          {backHref ? (
            <Link
              href={backHref}
              className="focus-ring touch-target -ml-1 shrink-0 rounded-md p-1 text-white transition-colors hover:bg-white/10"
              aria-label={backLabel ?? "Back"}
            >
              <BackIcon />
            </Link>
          ) : null}
          <h1 className="min-w-0 flex-1 truncate text-[16px] font-semibold text-white sm:text-[17px]">
            {title}
          </h1>
          {trailing && !stackTrailing ? (
            <div className="flex max-w-[min(100%,280px)] shrink-0 items-center justify-end gap-2">
              {trailing}
            </div>
          ) : null}
        </div>
        {trailing && stackTrailing ? (
          <div className="mt-2 w-full border-t border-[#1f1f1f] pt-2">{trailing}</div>
        ) : null}
      </div>
    </header>
  );
}

export function MemberTabBar<T extends string>({
  tabs,
  active,
  onChange,
  labels,
  ariaLabel,
  fullWidthContainer,
}: {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
  labels: Record<T, string>;
  ariaLabel: string;
  fullWidthContainer?: boolean;
}) {
  const wrap = fullWidthContainer ? memberContainerXl : "";

  return (
    <div className={`border-b border-[#2a2a2a] ${wrap}`}>
      <div
        className={`flex overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          fullWidthContainer ? "" : "px-0"
        }`}
        role="tablist"
        aria-label={ariaLabel}
      >
        {tabs.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab)}
              className={`focus-ring relative shrink-0 min-h-11 px-5 py-3 text-[14px] font-medium transition-colors ${
                isActive ? "text-white" : "text-[#9ca3af] hover:text-[#d4d4d4]"
              }`}
            >
              {labels[tab]}
              {isActive ? (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#178358]" aria-hidden />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MemberFilterToolbar({
  dateLabel,
  onDateClick,
  filterOpen,
  onFilterToggle,
  filterAriaLabel,
}: {
  dateLabel: string;
  onDateClick: () => void;
  filterOpen: boolean;
  onFilterToggle: () => void;
  filterAriaLabel: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <button type="button" onClick={onDateClick} className={memberDateChipClass}>
        {dateLabel}
      </button>
      <button
        type="button"
        aria-label={filterAriaLabel}
        aria-expanded={filterOpen}
        className={`focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-white/5 ${
          filterOpen ? "bg-white/10" : ""
        }`}
        onClick={onFilterToggle}
      >
        <MemberFilterIcon />
      </button>
    </div>
  );
}

export function MemberNoDataIllustration() {
  return (
    <div className="relative mx-auto mb-6 h-[120px] w-[120px]" aria-hidden>
      <svg
        className="absolute inset-0 animate-[spin_8s_linear_infinite]"
        viewBox="0 0 120 120"
        fill="none"
      >
        <ellipse
          cx="60"
          cy="60"
          rx="48"
          ry="14"
          stroke="#178358"
          strokeWidth="2"
          strokeOpacity="0.55"
          transform="rotate(-12 60 60)"
        />
      </svg>
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[42%]"
        width="72"
        height="64"
        viewBox="0 0 72 64"
        fill="none"
      >
        <path d="M8 18h56l-6 38H14L8 18z" fill="#178358" fillOpacity="0.35" />
        <path d="M8 18h56v8H8v-8z" fill="#1a9664" />
        <path
          d="M20 18V10c0-4 4-8 16-8s16 4 16 8v8"
          stroke="#4ade80"
          strokeWidth="2"
          fill="#0f3d2a"
        />
        <rect x="28" y="32" width="16" height="4" rx="1" fill="#4ade80" fillOpacity="0.6" />
      </svg>
    </div>
  );
}

export function MemberNoData({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 sm:py-20">
      <MemberNoDataIllustration />
      <p className="text-[15px] font-medium text-[#9ca3af]">{message}</p>
    </div>
  );
}

export function MemberStickyFooter({
  children,
  width = "narrow",
}: {
  children: React.ReactNode;
  width?: MemberContainerWidth;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-[#1f1f1f] bg-[#0a0a0a]/95 px-3 py-3 backdrop-blur-sm supports-[backdrop-filter]:bg-[#0a0a0a]/90 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:px-4 lg:pb-3">
      <div className={memberContainerFor(width)}>{children}</div>
    </div>
  );
}

export function MemberEmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#3a3a3a] px-6 py-14 text-center sm:py-16">
      <p className="max-w-sm text-[14px] leading-relaxed text-[#9ca3af]">{message}</p>
    </div>
  );
}

export function MemberSectionPlaceholder({
  title,
  message,
  backHref,
  backLabel,
}: {
  title: string;
  message: string;
  backHref: string;
  backLabel: string;
}) {
  return (
    <div className={MEMBER_PAGE_BG}>
      <MemberPageHeader title={title} backHref={backHref} backLabel={backLabel} width="wide" />
      <div className={`${memberContainerWide} ${memberPagePadding}`}>
        <MemberEmptyState message={message} />
      </div>
    </div>
  );
}
