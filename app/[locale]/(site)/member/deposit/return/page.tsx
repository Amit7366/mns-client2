"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { applySessionBalance } from "@/lib/auth/api";
import { useLocale } from "@/components/LocaleProvider";
import {
  MEMBER_PAGE_BG,
  memberBtnPrimary,
  memberContainerNarrow,
  memberPagePaddingNarrow,
  MemberPageHeader,
} from "@/components/member/shared/member-ui";
import { fetchWinyPayOrder, syncSessionBalance, type WinyPayOrder } from "@/lib/deposit-api";
import { memberSectionHref } from "@/lib/member-routes";

const POLL_MS = 2500;
const MAX_POLLS = 48;

function formatAmount(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function DepositReturnContent() {
  const { preferences } = useLocale();
  const { refreshBalance } = useAuth();
  const searchParams = useSearchParams();
  const locale = preferences.locale;
  const isBn = locale === "bn";
  const orderId = searchParams.get("order_id")?.trim() || "";

  const [order, setOrder] = useState<WinyPayOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const synced = useRef(false);

  useEffect(() => {
    if (!orderId) {
      setError(isBn ? "অর্ডার আইডি পাওয়া যায়নি" : "Missing order id");
      return;
    }

    let cancelled = false;
    let polls = 0;

    const tick = async () => {
      try {
        const next = await fetchWinyPayOrder(orderId);
        if (cancelled) return;
        setOrder(next);
        setError(null);
        if (next.status === "pending" && polls < MAX_POLLS) {
          polls += 1;
          window.setTimeout(() => {
            void tick();
          }, POLL_MS);
        }
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : isBn ? "স্ট্যাটাস লোড হয়নি" : "Could not load status");
        if (polls < MAX_POLLS) {
          polls += 1;
          window.setTimeout(() => {
            void tick();
          }, POLL_MS);
        }
      }
    };

    void tick();
    return () => {
      cancelled = true;
    };
  }, [orderId, isBn]);

  useEffect(() => {
    if (!order || order.status !== "success" || synced.current) return;
    synced.current = true;
    applySessionBalance(order.currentBalance);
    syncSessionBalance(order.currentBalance);
    void refreshBalance();
  }, [order, refreshBalance]);

  const status = order?.status ?? (error && !order ? "failed" : "pending");

  return (
    <div className={MEMBER_PAGE_BG}>
      <MemberPageHeader
        title={isBn ? "ডিপোজিট" : "Deposit"}
        backHref={`/${locale}/member/deposit`}
        backLabel={isBn ? "ডিপোজিট" : "Deposit"}
      />

      <section className={`${memberContainerNarrow} ${memberPagePaddingNarrow} text-center`}>
        {status === "success" ? (
          <>
            <p className="mb-2 text-[17px] font-semibold text-[#4ade80]">
              {isBn ? "ডিপোজিট সফল" : "Deposit successful"}
            </p>
            <p className="mb-6 text-[14px] text-[#9ca3af]">
              {isBn
                ? `৳ ${formatAmount(order?.amount ?? 0)} আপনার ব্যালেন্সে যোগ হয়েছে।`
                : `৳ ${formatAmount(order?.amount ?? 0)} has been credited to your balance.`}
            </p>
          </>
        ) : status === "failed" ? (
          <>
            <p className="mb-2 text-[17px] font-semibold text-[#f87171]">
              {isBn ? "ডিপোজিট ব্যর্থ" : "Deposit failed"}
            </p>
            <p className="mb-6 text-[14px] text-[#9ca3af]">
              {error ||
                (isBn
                  ? "পেমেন্ট সম্পন্ন হয়নি। আবার চেষ্টা করুন।"
                  : "Payment was not completed. Please try again.")}
            </p>
          </>
        ) : (
          <>
            <p className="mb-2 text-[17px] font-semibold text-white">
              {isBn ? "পেমেন্ট প্রসেস হচ্ছে…" : "Processing payment…"}
            </p>
            <p className="mb-6 text-[14px] text-[#9ca3af]">
              {isBn
                ? "পেমেন্ট নিশ্চিত হলে ব্যালেন্স স্বয়ংক্রিয়ভাবে আপডেট হবে।"
                : "Your balance will update automatically when payment is confirmed."}
            </p>
          </>
        )}

        <div className="flex flex-col gap-2">
          <Link href={memberSectionHref(locale, "transaction-records")} className={memberBtnPrimary}>
            {isBn ? "ট্রানজেকশন রেকর্ডস" : "Transaction records"}
          </Link>
          <Link
            href={`/${locale}/member/deposit/quick`}
            className="focus-ring min-h-11 rounded-md border border-[#555] py-3 text-[14px] font-medium text-white hover:bg-white/5"
          >
            {isBn ? "আরেকটি ডিপোজিট" : "Make another deposit"}
          </Link>
        </div>
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
