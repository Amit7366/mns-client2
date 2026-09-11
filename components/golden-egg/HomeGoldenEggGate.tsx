"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { fetchGoldenEggStatus, type GoldenEggStatus } from "@/lib/golden-egg-api";
import { OPEN_GOLDEN_EGG_EVENT } from "@/lib/golden-egg-events";
import GoldenEggModal from "./GoldenEggModal";

export default function HomeGoldenEggGate() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<GoldenEggStatus | null>(null);

  useEffect(() => {
    const onOpen = () => {
      if (!isAuthenticated) return;
      void (async () => {
        try {
          const data = await fetchGoldenEggStatus();
          setStatus(data);
        } catch {
          setStatus(null);
        }
        setOpen(true);
      })();
    };
    window.addEventListener(OPEN_GOLDEN_EGG_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_GOLDEN_EGG_EVENT, onOpen);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) setOpen(false);
  }, [isAuthenticated]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  if (!open) return null;

  return <GoldenEggModal open={open} onClose={handleClose} initialStatus={status} />;
}
