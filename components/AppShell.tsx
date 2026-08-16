"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TopNavbar from "./TopNavbar";
import SideNavigation from "./SideNavigation";
import SiteFooter from "./SiteFooter";
import MobileBottomNav from "./MobileBottomNav";
import CurrencyLanguageModal from "./CurrencyLanguageModal";
import { ToastProvider } from "./ToastProvider";
import GameReturnHandler from "./GameReturnHandler";
import { GamePlayGateProvider } from "./games/GamePlayGateProvider";
import { siteShellClass } from "@/lib/theme";

function isHomePath(pathname: string): boolean {
  return /^\/(bn|en|hi)\/?$/.test(pathname);
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarExpanded((open) => !open);
  }, []);

  const closeSidebar = useCallback(() => setSidebarExpanded(false), []);

  const pathname = usePathname();

  useEffect(() => {
    setSidebarExpanded(false);
    setProfileSheetOpen(false);
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
      <TopNavbar onMenuClick={toggleSidebar} menuOpen={sidebarExpanded} />

      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        <SideNavigation expanded={sidebarExpanded} onClose={closeSidebar} />

        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain pb-[calc(3.5rem+env(safe-area-inset-bottom))] [-webkit-overflow-scrolling:touch] lg:pb-0">
          <div className={siteShellClass}>
            {children}
            {isHomePath(pathname) ? <SiteFooter /> : null}
          </div>
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
