"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { applySessionBalance } from "@/lib/auth/api";
import { useLocale } from "@/components/LocaleProvider";
import {
  MEMBER_PAGE_BG,
  memberContainerNarrow,
  memberPagePaddingNarrow,
  MemberPageHeader,
} from "@/components/member/shared/member-ui";
import { fetchWinyPayOrder, syncSessionBalance } from "@/lib/deposit-api";
import { memberDepositHref } from "@/lib/member-routes";

const POLL_MS = 2500;
const MAX_POLLS = 48;

function DepositReturnContent() {
  const { preferences } = useLocale();
  const { refreshBalance } = useAuth();
  const searchParams = useSearchParams();
  const locale = preferences.locale;
  const isBn = locale === "bn";
  const orderId = searchParams.get("order_id")?.trim() || "";
  const redirected = useRef(false);

  useEffect(() => {
    const sameOrigin = window.location.origin;
    const goHome = () => {
      if (redirected.current) return;
      redirected.current = true;
      window.location.replace(`${sameOrigin}/${locale}`);
    };
    const goDeposit = () => {
      if (redirected.current) return;
      redirected.current = true;
      window.location.replace(`${sameOrigin}${memberDepositHref(locale)}`);
    };

    if (!orderId) {
      goDeposit();
      return;
    }

    let cancelled = false;
    let polls = 0;
    let timer = 0;

    const retry = () => {
      if (cancelled || polls >= MAX_POLLS) {
        goDeposit();
        return;
      }
      polls += 1;
      timer = window.setTimeout(() => {
        void tick();
      }, POLL_MS);
    };

    const tick = async () => {
      try {
        const next = await fetchWinyPayOrder(orderId);
        if (cancelled) return;
        if (next.status === "success") {
          applySessionBalance(next.currentBalance);
          syncSessionBalance(next.currentBalance);
          void refreshBalance();
          goHome();
          return;
        }
        if (next.status === "failed") {
          goDeposit();
          return;
        }
        retry();
      } catch {
        if (cancelled) return;
        retry();
      }
    };

    void tick();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [orderId, locale, refreshBalance]);

  return (
    <div className={MEMBER_PAGE_BG}>
      <MemberPageHeader
        title={isBn ? "ডিপোজিট" : "Deposit"}
        backHref={memberDepositHref(locale)}
        backLabel={isBn ? "ডিপোজিট" : "Deposit"}
      />

      <section className={`${memberContainerNarrow} ${memberPagePaddingNarrow} text-center`}>
        <p className="mb-2 text-[17px] font-semibold text-white">
          {isBn ? "পেমেন্ট প্রসেস হচ্ছে…" : "Processing payment…"}
        </p>
        <p className="text-[14px] text-[#9ca3af]">
          {isBn
            ? "নিশ্চিত হলে হোমে ফিরে যাবে। ব্যর্থ হলে ডিপোজিট পেজে ফিরে যাবে।"
            : "You will return home when payment is confirmed, or back to deposit if it fails."}
        </p>
      </section>
    </div>
  );
}

export default function DepositReturnPage() {
  return (
    <Suspense fallback={<div className={MEMBER_PAGE_BG} />}>
      <DepositReturnContent />
    </Suspense>
  );
}
