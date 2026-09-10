"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { usePwaInstall } from "@/lib/use-pwa-install";
import AppDownloadPrompt from "./AppDownloadPrompt";

const DISMISS_KEY = "bkbaji.appDownload.topBar.dismissed";

export default function HomeAppDownloadGate() {
  const pathname = usePathname();
  const { isStandalone } = usePwaInstall();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isStandalone) {
      setOpen(false);
      return;
    }

    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") {
        setOpen(false);
        return;
      }
    } catch {
      // Ignore storage errors
    }

    setOpen(true);
  }, [pathname, isStandalone]);

  const handleClose = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Ignore storage errors
    }
    setOpen(false);
  }, []);

  if (!open) return null;

  return <AppDownloadPrompt onClose={handleClose} />;
}
