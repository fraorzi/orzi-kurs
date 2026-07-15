"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Catalog } from "@/app/lib/types";
import Sidebar from "./Sidebar";
import CommandPalette from "./CommandPalette";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    function loadCatalog() {
      fetch("/api/catalog")
        .then((r) => r.json())
        .then((data: Catalog) => {
          if (!cancelled) setCatalog(data);
        })
        .catch(() => {});
    }
    loadCatalog();
    window.addEventListener("orzi:progress", loadCatalog);
    return () => {
      cancelled = true;
      window.removeEventListener("orzi:progress", loadCatalog);
    };
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      const t = e.target as HTMLElement;
      const typing = /input|textarea|select/i.test(t.tagName);
      if (e.key === "[" && !typing) setCollapsed((v) => !v);
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
  }, []);

  return (
    <div className={`shell${collapsed ? " collapsed" : ""}`}>
      <Sidebar
        catalog={catalog}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />
      <div className="content">{children}</div>
      {paletteOpen && (
        <CommandPalette catalog={catalog} onClose={() => setPaletteOpen(false)} />
      )}
      <div className="helper">
        <span className="kbd">[</span> panel · <span className="kbd">⌘K</span> szukaj
      </div>
    </div>
  );
}
