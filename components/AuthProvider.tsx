"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { logoutUser as logoutApi, fetchWalletMeta, refreshWalletBalance } from "@/lib/auth/api";
import { fetchMyNormalUserProfile } from "@/lib/member/profile-api";
import { expireSessionIfNeeded } from "@/lib/auth/session-expired";
import {
  handleGameReturnBalance,
  isBalanceUpdatePending,
  manualReanchorBalance,
} from "@/lib/game-balance-sync";
import { USER_ROLE } from "@/lib/auth/constants";
import {
  AUTH_CHANGE_EVENT,
  readAuthSession,
  saveAuthSession,
  type AuthSession,
} from "@/lib/auth/session";
import { subscribeWalletLocalChange } from "@/lib/wallet-local-state";

type AuthContextValue = {
  session: AuthSession | null;
  authReady: boolean;
  balanceSyncing: boolean;
  isAuthenticated: boolean;
  isUser: boolean;
  refreshSession: () => void;
  refreshBalance: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const WALLET_FOCUS_DEBOUNCE_MS = 1500;
const ANCHOR_CHECK_INTERVAL_MS = 2 * 60 * 60 * 1000;
const SESSION_CHECK_INTERVAL_MS = 30_000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [balanceSyncing, setBalanceSyncing] = useState(false);
  const lastWalletSyncRef = useRef(0);
  const syncChainRef = useRef(Promise.resolve());

  const refreshSession = useCallback(() => {
    setSession(readAuthSession());
  }, []);

  const syncWalletFromServer = useCallback(
    (opts?: { gameReturn?: boolean; forceDb?: boolean }) => {
      const run = async () => {
        const current = readAuthSession();
        if (!current?.accessToken || !current.memberId) return;

        setBalanceSyncing(true);
        try {
          const gamePending = isBalanceUpdatePending();
          if ((opts?.gameReturn || gamePending) && gamePending) {
            await handleGameReturnBalance();
          }

          if (opts?.forceDb) {
            await manualReanchorBalance();
          } else if (!isBalanceUpdatePending()) {
            await fetchWalletMeta();
          }
          refreshSession();
        } finally {
          setBalanceSyncing(false);
          lastWalletSyncRef.current = Date.now();
        }
      };

      const next = syncChainRef.current.then(run, run);
      syncChainRef.current = next.then(
        () => undefined,
        () => undefined,
      );
      return next;
    },
    [refreshSession],
  );

  useEffect(() => {
    if (expireSessionIfNeeded()) {
      setSession(null);
      return;
    }

    const current = readAuthSession();
    if (current) {
      saveAuthSession(current);
    }
    setSession(current);
    setAuthReady(true);

    function onAuthChange() {
      refreshSession();
    }
    window.addEventListener(AUTH_CHANGE_EVENT, onAuthChange);
    window.addEventListener("storage", onAuthChange);
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, onAuthChange);
      window.removeEventListener("storage", onAuthChange);
    };
  }, [refreshSession]);

  useEffect(() => {
    return subscribeWalletLocalChange(refreshSession);
  }, [refreshSession]);

  /** Log out and redirect when JWT expires while the app is open. */
  useEffect(() => {
    if (!authReady) return;

    const checkExpiry = () => {
      if (expireSessionIfNeeded()) {
        setSession(null);
      }
    };

    checkExpiry();
    const intervalId = window.setInterval(checkExpiry, SESSION_CHECK_INTERVAL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") checkExpiry();
    };

    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [authReady]);

  useEffect(() => {
    if (!authReady || !session?.accessToken || session.role !== USER_ROLE) return;

    void fetchMyNormalUserProfile()
      .then(() => refreshSession())
      .catch(() => {
        /* keep session accountStatus from login */
      });
  }, [authReady, session?.accessToken, session?.role, refreshSession]);

  /** On load: restore game wallet only if a session is pending, then GET site balance. */
  useEffect(() => {
    if (!authReady || !session?.accessToken || !session.memberId) return;
    void (async () => {
      if (isBalanceUpdatePending()) {
        try {
          await handleGameReturnBalance();
        } catch {
          /* gameSessionActive stays true; retry on next focus / game tap */
        }
      }
      if (!isBalanceUpdatePending()) {
        await refreshWalletBalance();
      }
      refreshSession();
    })();
  }, [authReady, session?.accessToken, session?.memberId, refreshSession]);

  /** Tab focus: return from game if needed, otherwise refresh Mongo balance. */
  useEffect(() => {
    if (!authReady || !session?.accessToken || !session.memberId) return;

    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      const elapsed = Date.now() - lastWalletSyncRef.current;
      if (elapsed < WALLET_FOCUS_DEBOUNCE_MS) return;

      void syncWalletFromServer({ gameReturn: isBalanceUpdatePending() });
    };

    window.addEventListener("focus", onVisible);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("focus", onVisible);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [authReady, session?.accessToken, session?.memberId, syncWalletFromServer]);

  /** Every 2 hours: re-anchor from DB while logged in. */
  useEffect(() => {
    if (!authReady || !session?.memberId) return;

    const id = window.setInterval(() => {
      void syncWalletFromServer({ forceDb: true });
    }, ANCHOR_CHECK_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [authReady, session?.memberId, syncWalletFromServer]);

  const refreshBalance = useCallback(async () => {
    await syncWalletFromServer({
      gameReturn: isBalanceUpdatePending(),
      forceDb: true,
    });
  }, [syncWalletFromServer]);

  const logout = useCallback(async () => {
    await logoutApi();
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      authReady,
      balanceSyncing,
      isAuthenticated: Boolean(session?.accessToken),
      isUser: session?.role === USER_ROLE,
      refreshSession,
      refreshBalance,
      logout,
    }),
    [session, authReady, balanceSyncing, refreshSession, refreshBalance, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
