"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { Catalog } from "@/app/lib/types";
import Sidebar from "./Sidebar";
import CommandPalette from "./CommandPalette";
import { IconMenu } from "./icons";
import RouteTransition from "./RouteTransition";
import styles from "./shell.module.css";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function Shell({ children }: { children: React.ReactNode }) {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [catalogStatus, setCatalogStatus] = useState<"loading" | "error" | "success">("loading");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const catalogRequestRef = useRef(0);
  const mobileNavTriggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setMobileNavOpen(false);
  }

  const loadCatalog = useCallback(async () => {
    const requestId = ++catalogRequestRef.current;
    await Promise.resolve();
    if (requestId !== catalogRequestRef.current) return;
    setCatalogStatus("loading");
    try {
      const response = await fetch("/api/catalog");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json() as Catalog;
      if (requestId === catalogRequestRef.current) {
        setCatalog(data);
        setCatalogStatus("success");
      }
    } catch {
      if (requestId === catalogRequestRef.current) setCatalogStatus("error");
    }
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => void loadCatalog(), 0);
    window.addEventListener("orzi:progress", loadCatalog);
    return () => {
      window.clearTimeout(initialLoad);
      window.removeEventListener("orzi:progress", loadCatalog);
    };
  }, [loadCatalog]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px)");
    const syncViewport = () => {
      setIsMobile(query.matches);
      if (!query.matches) setMobileNavOpen(false);
    };
    syncViewport();
    query.addEventListener("change", syncViewport);
    return () => query.removeEventListener("change", syncViewport);
  }, []);

  const closeMobileNavigation = useCallback((restoreFocus = true) => {
    setMobileNavOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => mobileNavTriggerRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    if (!isMobile || !mobileNavOpen) return;
    const drawer = document.getElementById("course-navigation");
    const focusable = drawer?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusable?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (drawer?.querySelector('[aria-controls="track-switcher"][aria-expanded="true"]')) {
          return;
        }
        event.preventDefault();
        closeMobileNavigation();
        return;
      }
      if (event.key !== "Tab" || !drawer) return;
      const elements = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        .filter((element) => !element.closest("[inert]") && element.offsetParent !== null);
      const first = elements[0];
      const last = elements.at(-1);
      if (!first || !last) {
        event.preventDefault();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeMobileNavigation, isMobile, mobileNavOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      const target = e.target as HTMLElement;
      const typing = /input|textarea|select/i.test(target.tagName) || target.isContentEditable;
      if (e.key === "[" && !typing && !isMobile) setCollapsed((value) => !value);
    }
    function onSearch() {
      setPaletteOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("orzi:search", onSearch);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("orzi:search", onSearch);
    };
  }, [isMobile]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("orzi:search-state", { detail: paletteOpen }));
  }, [paletteOpen]);

  return (
    <div className={`shell${collapsed ? " collapsed" : ""}`}>
      <a
        className={styles.skipLink}
        href="#main-content"
        aria-hidden={paletteOpen || (isMobile && mobileNavOpen) ? true : undefined}
        tabIndex={paletteOpen || (isMobile && mobileNavOpen) ? -1 : undefined}
      >
        Przejdź do treści
      </a>
      <button
        ref={mobileNavTriggerRef}
        className={`icon-btn ${styles.mobileNavButton}`}
        type="button"
        aria-label="Otwórz nawigację kursu"
        aria-expanded={mobileNavOpen}
        aria-controls="course-navigation"
        aria-hidden={paletteOpen ? true : undefined}
        inert={paletteOpen ? true : undefined}
        onClick={() => {
          setPaletteOpen(false);
          setMobileNavOpen(true);
        }}
      >
        <IconMenu />
      </button>
      <Sidebar
        catalog={catalog}
        catalogStatus={catalogStatus}
        collapsed={collapsed}
        isMobile={isMobile}
        mobileOpen={mobileNavOpen}
        onToggle={() => setCollapsed((v) => !v)}
        onMobileClose={() => closeMobileNavigation()}
        onMobileNavigate={() => {
          if (!isMobile) return;
          closeMobileNavigation(false);
          window.requestAnimationFrame(() => {
            document.getElementById("main-content")?.focus();
          });
        }}
        onRetryCatalog={() => void loadCatalog()}
        inert={paletteOpen}
      />
      {isMobile && mobileNavOpen && (
        <button
          className={styles.backdrop}
          type="button"
          aria-label="Zamknij nawigację kursu"
          tabIndex={-1}
          onClick={() => closeMobileNavigation()}
        />
      )}
      <motion.main
        className={`content ${styles.main}`}
        id="main-content"
        tabIndex={-1}
        layoutScroll
        inert={paletteOpen || (isMobile && mobileNavOpen) ? true : undefined}
      >
        <RouteTransition pathname={pathname}>{children}</RouteTransition>
      </motion.main>
      {paletteOpen && (
        <CommandPalette
          catalog={catalog}
          catalogStatus={catalogStatus}
          onClose={() => setPaletteOpen(false)}
          onRetryCatalog={() => void loadCatalog()}
        />
      )}
      <div className="helper" aria-hidden="true">
        <span className="kbd">[</span> panel · <span className="kbd">⌘K</span> szukaj
      </div>
    </div>
  );
}
