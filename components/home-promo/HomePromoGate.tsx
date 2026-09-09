"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import HomeAnnouncementModal from "@/components/home-announcement/HomeAnnouncementModal";

const DISMISS_KEY = "bkbaji.homeAnnouncement.dismissed";

function isHomePath(pathname: string): boolean {
  return /^\/(bn|en|hi)\/?$/.test(pathname);
}

export default function HomePromoGate() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isHomePath(pathname)) {
      setOpen(false);
      return;
    }

    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      // Ignore storage errors
    }

    const timer = window.setTimeout(() => setOpen(true), 400);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const handleClose = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Ignore storage errors
    }
    setOpen(false);
  }, []);

  return <HomeAnnouncementModal open={open} onClose={handleClose} />;
}
