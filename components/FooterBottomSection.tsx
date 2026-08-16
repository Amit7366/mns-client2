"use client";

import { useState } from "react";
import { socialLinks } from "@/lib/footer-social-data";
import { useLocale } from "./LocaleProvider";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 text-[12px] font-semibold text-[var(--cyan)]">{children}</h3>;
}

function CuracaoLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#22c55e] via-[#3b82f6] to-[#a855f7] text-[10px] font-black text-white">
        GC
      </div>
      <span className="text-[10px] font-semibold leading-tight text-[var(--text-muted)]">
        GAMING
        <br />
        CURACAO
      </span>
    </div>
  );
}

function AnjouanLogo() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--surface)] text-[8px] font-bold leading-tight text-[var(--text-muted)]">
      Anjouan
      <br />
      eGaming
    </div>
  );
}

function SealLogo() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--gold)] bg-[var(--surface)] text-[9px] font-bold text-[var(--gold)]">
      GLI
    </div>
  );
}

function Age18Icon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] text-[11px] font-bold text-[var(--text)]">
      18+
    </div>
  );
}

function SocialIcon({ color, label }: { color: string; label: string }) {
  return (
    <a
      href="#"
      className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white transition-opacity hover:opacity-85"
      style={{ backgroundColor: color }}
    >
      {label}
    </a>
  );
}

export default function FooterBottomSection() {
  const { t } = useLocale();
  const b = t.footer.bottom;
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="my-8 border-t border-[var(--border)]" />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <SectionTitle>{b.gamingLicense}</SectionTitle>
          <div className="flex flex-wrap items-center gap-4">
            <CuracaoLogo />
            <AnjouanLogo />
            <SealLogo />
          </div>
        </div>

        <div>
          <SectionTitle>{b.responsibleGaming}</SectionTitle>
          <div className="flex flex-wrap items-center gap-4">
            <Age18Icon />
            <div className="text-[11px] font-bold tracking-wider text-[var(--text-muted)]">GAMCARE</div>
          </div>
        </div>
      </div>

      <div className="my-8 border-t border-[var(--border)]" />

      <div className="flex flex-wrap justify-center gap-2.5">
        {socialLinks.map((social) => (
          <SocialIcon key={social.id} color={social.color} label={social.label} />
        ))}
      </div>

      <div className="my-8 border-t border-[var(--border)]" />

      <div className="relative">
        <h3 className="mb-3 text-[13px] font-semibold text-[var(--text)]">{b.aboutHeading}</h3>
        <p
          className={`whitespace-pre-line text-[11px] leading-[1.7] text-[var(--text-muted)] ${
            expanded ? "" : "line-clamp-4"
          }`}
        >
          {b.aboutText}
          {expanded ? `\n\n${b.aboutTextMore}` : null}
        </p>
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-6 py-1.5 text-[12px] text-white transition-colors hover:bg-[var(--surface-elevated)]"
          >
            {expanded ? b.showLess : b.showMore}
          </button>
        </div>
      </div>

      <div className="my-8 border-t border-[var(--border)]" />

      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
        <a href="#" className="text-[26px] font-bold tracking-tight">
          <span className="text-[var(--gold)]">BK</span>
          <span className="text-white">Baji</span>
        </a>
        <div>
          <p className="text-[13px] font-semibold text-[var(--cyan)]">{b.winLikeAKing}</p>
          <p className="text-[11px] text-[var(--text-muted)]">{b.copyright}</p>
        </div>
      </div>

      <div className="my-8 border-t border-[var(--border)]" />

      <div className="space-y-3 text-[11px] leading-[1.7] text-[var(--text-muted)]">
        <p>
          <span className="text-[var(--cyan)]">bkbaji.com</span> {b.legalOwnership}
        </p>
        <p>
          {b.legalContactPrefix}{" "}
          <a href="mailto:legal@northernlightsltd.com" className="text-[var(--cyan)] hover:underline">
            legal@northernlightsltd.com
          </a>
          .
        </p>
        <p>
          <span className="text-[var(--cyan)]">bkbaji.com</span> {b.legalLicense}
        </p>
        <p>
          <span className="text-[var(--cyan)]">bkbaji.com</span> {b.legalCompliance}
        </p>
      </div>
    </>
  );
}
