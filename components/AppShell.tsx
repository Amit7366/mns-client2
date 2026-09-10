"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TopNavbar from "./TopNavbar";
import SideNavigation from "./SideNavigation";
import SiteFooter from "./SiteFooter";
import MobileBottomNav from "./MobileBottomNav";
import HomeAppDownloadGate from "./app-download/HomeAppDownloadGate";
import CurrencyLanguageModal from "./CurrencyLanguageModal";
import { ToastProvider } from "./ToastProvider";
import GameReturnHandler from "./GameReturnHandler";
import { GamePlayGateProvider } from "./games/GamePlayGateProvider";
import { siteShellClass } from "@/lib/theme";
import { useLocale } from "./LocaleProvider";

function isHomePath(pathname: string): boolean {
  return /^\/(bn|en|hi)\/?$/.test(pathname);
}

function isDesktopViewport(): boolean {
  return window.matchMedia("(min-width: 1024px)").matches;
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarExpanded((open) => !open);
  }, []);

  const closeSidebar = useCallback(() => setSidebarExpanded(false), []);

  const pathname = usePathname();
  const { t } = useLocale();

  useEffect(() => {
    setSidebarExpanded(isDesktopViewport());
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setSidebarExpanded(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setProfileSheetOpen(false);
    if (!isDesktopViewport()) setSidebarExpanded(false);
  }, [pathname]);

  const handleProfileClick = useCallback(() => {
    setSidebarExpanded(false);
    setProfileSheetOpen((open) => !open);
  }, []);

  const handleProfileClose = useCallback(() => {
    setProfileSheetOpen(false);
  }, []);

  return (
    <ToastProvider>
    <GamePlayGateProvider>
    <GameReturnHandler />
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-[var(--bg)]">
      <HomeAppDownloadGate />
      <TopNavbar onMenuClick={toggleSidebar} menuOpen={sidebarExpanded} />

      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        <SideNavigation expanded={sidebarExpanded} onClose={closeSidebar} />
        {sidebarExpanded ? (
          <button
            type="button"
            className="absolute inset-0 z-20 bg-black/50 lg:hidden"
            aria-label={t.ui.closeMenu}
            onClick={closeSidebar}
          />
        ) : null}

        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain pb-[calc(3.5rem+env(safe-area-inset-bottom))] [-webkit-overflow-scrolling:touch] lg:pb-0">
          <div className={siteShellClass}>
            {children}
          </div>
          {isHomePath(pathname) ? <SiteFooter /> : null}
        </main>
      </div>

      <MobileBottomNav
        onMenuClick={toggleSidebar}
        menuOpen={sidebarExpanded}
        profileOpen={profileSheetOpen}
        onProfileClick={handleProfileClick}
        onProfileClose={handleProfileClose}
      />
      <CurrencyLanguageModal />
    </div>
    </GamePlayGateProvider>
    </ToastProvider>
  );
}
