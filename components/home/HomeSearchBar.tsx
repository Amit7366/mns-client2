"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { lobbyCategoryHref } from "@/lib/vendor-routes";

export default function HomeSearchBar() {
  const { t, preferences } = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    const base = lobbyCategoryHref(preferences.locale, "slot");
    if (q) {
      router.push(`${base}&q=${encodeURIComponent(q)}`);
    } else {
      router.push(base);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full pt-3">
      <label className="relative block">
        <span className="sr-only">{t.home.searchPlaceholder}</span>
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[var(--text-muted)]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.home.searchPlaceholder}
          className="focus-ring h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-deep)] py-2 pl-9 pr-3 text-[13px] text-[var(--text)] placeholder:text-[var(--text-muted)]"
        />
      </label>
    </form>
  );
}
