"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { footerGameCenterItems, footerPartnerLogos } from "@/lib/footer-data";
import { ACTIVE_CATALOG_PROVIDERS } from "@/lib/catalog-providers";
import { memberLiveChatHref } from "@/lib/member-routes";
import { lobbyCategoryHref, type LobbyKind } from "@/lib/vendor-routes";
import { useAuth } from "./AuthProvider";
import ProviderLogo from "./ProviderLogo";
import { useLocale } from "./LocaleProvider";
import { siteShellClass } from "@/lib/theme";
import { openAuthModal } from "@/lib/auth-modal-events";

function BrandSeal() {
  return (
    <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border-2 border-[var(--gold)] bg-gradient-to-b from-[#0a4a40] to-[#022820] shadow-[0_0_16px_rgba(212,175,55,0.25)] sm:h-20 sm:w-20">
      <div className="text-center leading-none">
        <div className="mb-0.5 flex justify-center gap-0.5 text-[10px]">
          <span>♠</span>
          <span>♥</span>
          <span>♦</span>
          <span>♣</span>
        </div>
        <div className="text-[13px] font-black tracking-tight text-[var(--gold)] sm:text-[14px]">
          BK<span className="text-white">Baji</span>
        </div>
      </div>
    </div>
  );
}

function FooterCtaButton({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const className =
    "focus-ring inline-flex min-h-11 min-w-[7.5rem] items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-[#0d5c52] to-[#064039] px-4 text-[13px] font-semibold text-[var(--gold)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:from-[#117066] hover:to-[#085248] sm:min-w-[8.5rem]";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

function ChatBubbleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v6A1.5 1.5 0 0112.5 11H6l-3 2.5V3.5z"
        fill="#F5C518"
      />
    </svg>
  );
}

function SocialCircle({
  href,
  color,
  label,
  children,
}: {
  href: string;
  color: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
      style={{ backgroundColor: color }}
    >
      {children}
    </a>
  );
}

export default function SiteFooter() {
  const { t, preferences } = useLocale();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const f = t.footer;
  const locale = preferences.locale;
  const base = `/${locale}`;

  const providerMeta = new Map(
    ACTIVE_CATALOG_PROVIDERS.map((p) => [p.providerKey, p] as const),
  );

  function gameHref(kind: LobbyKind): string {
    return lobbyCategoryHref(locale, kind);
  }

  function goLiveChat() {
    const href = memberLiveChatHref(locale);
    if (!isAuthenticated) {
      openAuthModal("login", href);
      return;
    }
    router.push(href);
  }

  return (
    <footer className="safe-bottom mt-6 border-t border-white/10 bg-[#003936] text-white">
      <div className={`${siteShellClass} py-8 sm:py-10`}>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          {/* Left nav columns */}
          <div className="flex shrink-0 gap-10 sm:gap-14">
            <div>
              <h3 className="mb-3 text-[14px] font-semibold text-[#FFB800]">{f.helpCenter}</h3>
            </div>
            <div>
              <h3 className="mb-3 text-[14px] font-semibold text-[#FFB800]">{f.gameCenter}</h3>
              <ul className="space-y-2">
                {footerGameCenterItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={gameHref(item.hrefKind)}
                      className="text-[12px] text-white/90 transition-colors hover:text-[#FFB800] sm:text-[13px]"
                    >
                      {f.gameCenterLinks[item.id] ?? item.id}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right brand / CTA / partners */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
              <BrandSeal />
              <p className="max-w-xl text-[12px] leading-relaxed text-white/90 sm:text-[13px]">
                {f.bottom.aboutText}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <FooterCtaButton href={`${base}/referral`}>{f.partners}</FooterCtaButton>
              <FooterCtaButton onClick={goLiveChat}>
                <ChatBubbleIcon />
                {f.liveChat}
              </FooterCtaButton>

              <div className="ml-0 flex items-center gap-2 sm:ml-2">
                <SocialCircle href="https://facebook.com" color="#1877F2" label="Facebook">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v7h4v-7h3.2l.8-4H13V9c0-.6.4-1 1-1z" />
                  </svg>
                </SocialCircle>
                <SocialCircle href="https://t.me" color="#229ED9" label="Telegram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M21.5 3.3L2.8 10.8c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.7.1.9.8.9.5 0 .7-.2 1-.6l2.7-3.6 5.6 4.1c1 .6 1.8.3 2-.9l3.7-17.4c.3-1.4-.5-2-1.5-1.5z" />
                  </svg>
                </SocialCircle>
                <SocialCircle href="https://wa.me" color="#25D366" label="WhatsApp">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.5 14.2c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.1-.3.2-.6.1-1.5-.5-2.8-1.4-3.8-2.8-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4 1.4.5 1.9.6 2.6.5.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18.2c-4.5 0-8.2-3.7-8.2-8.2S7.5 3.8 12 3.8s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2z" />
                  </svg>
                </SocialCircle>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dc2626] text-[11px] font-bold text-white"
                  aria-label="18+"
                >
                  18+
                </span>
              </div>
            </div>

            <div className="my-5 border-t border-white/20" />

            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7">
              {footerPartnerLogos.map((partner) => {
                const meta = providerMeta.get(partner.id);
                return (
                  <div
                    key={partner.id}
                    className="flex h-10 items-center justify-center rounded-md border border-white/10 bg-[#022e2b] px-1.5 sm:h-11"
                    title={partner.label}
                  >
                    {meta ? (
                      <ProviderLogo
                        providerKey={meta.providerKey}
                        initials={meta.initials}
                        color={meta.color}
                        size="sm"
                      />
                    ) : (
                      <span className="text-[9px] font-bold uppercase tracking-wide text-white/80">
                        {partner.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
