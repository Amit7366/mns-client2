"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { fetchRedEnvelopeStatus, type RedEnvelopeStatus } from "@/lib/red-envelope-api";
import { OPEN_RED_ENVELOPE_EVENT } from "@/lib/red-envelope-events";
import RedEnvelopeModal from "./RedEnvelopeModal";

export default function HomeRedEnvelopeGate() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<RedEnvelopeStatus | null>(null);

  useEffect(() => {
    const onOpen = () => {
      if (!isAuthenticated) return;
      void (async () => {
        try {
          const data = await fetchRedEnvelopeStatus();
          setStatus(data);
        } catch {
          setStatus(null);
        }
        setOpen(true);
      })();
    };
    window.addEventListener(OPEN_RED_ENVELOPE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_RED_ENVELOPE_EVENT, onOpen);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) setOpen(false);
  }, [isAuthenticated]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  if (!open) return null;

  return <RedEnvelopeModal open={open} onClose={handleClose} initialStatus={status} />;
}
