"use client";

import { useEffect, useRef } from "react";
import {
  GAME_RETURN_EVENT,
  dispatchGameReturn,
} from "@/lib/game-return-events";
import { handleGameReturnBalance } from "@/lib/game-balance-sync";
import { AUTH_CHANGE_EVENT, readAuthSession } from "@/lib/auth/session";

/**
 * After a game session: sync Mongo balance (seamless — no provider getwithdraw) and update UI.
 * Idempotent when no active game session on the server.
 */
export default function GameReturnHandler() {
  const runningRef = useRef(false);

  useEffect(() => {
    const runIfNeeded = async () => {
      if (!readAuthSession()?.accessToken) return;
      if (runningRef.current) return;

      runningRef.current = true;
      dispatchGameReturn();

      try {
        await handleGameReturnBalance();
        window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
      } catch {
        /* gameSessionActive stays true on server; retry on next focus / game tap */
      } finally {
        runningRef.current = false;
      }
    };

    const onPageShow = () => {
      void runIfNeeded();
    };

    void runIfNeeded();

    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("focus", onPageShow);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("focus", onPageShow);
    };
  }, []);

  return null;
}
