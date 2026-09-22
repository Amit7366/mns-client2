"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { MEMBER_PAGE_BG } from "@/components/member/shared/member-ui";

/** Old AutoPay verify URL — send members back to the WinyPay deposit form. */
export default function DeprecatedQuickVerifyPage() {
  const { preferences } = useLocale();
  const router = useRouter();
  const locale = preferences.locale;

  useEffect(() => {
    router.replace(`/${locale}/member/deposit/quick`);
  }, [locale, router]);

  return <div className={MEMBER_PAGE_BG} />;
}
