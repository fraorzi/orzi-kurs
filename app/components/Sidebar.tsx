"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Catalog } from "@/app/lib/types";
import { statusGlyph } from "./StatusBadge";

const STATUS_COLOR: Record<string, string> = {
  passed: "text-pass",
  failed: "text-fail",
  "not-started": "text-fg-faint",
};

export default function Sidebar() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((data: Catalog) => {
        if (!cancelled) setCatalog(data);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <nav className="w-72 shrink-0 h-full overflow-y-auto bg-bg-raised border-r border-border flex flex-col">
      <Link
        href="/"
        className="block px-4 py-4 border-b border-border text-[15px] font-extrabold tracking-tight text-fg hover:bg-bg-inset"
      >
        orzi-kurs
      </Link>

      <div className="flex-1 py-2">
        {!catalog && (
          <div className="px-4 py-3 text-fg-faint text-xs">ladowanie katalogu…</div>
        )}

        {catalog?.tracks.map((track) => (
          <div key={track.id} className="mb-3">
            <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-fg-faint">
              track: {track.id}
            </div>

            {track.topics.map((topic) => {
              const topicSlug = topic.id.split("/")[1];
              const topicHref = `/track/${track.id}/${topicSlug}`;
              const topicActive = pathname === topicHref;

              return (
                <div key={topic.id} className="mb-1">
                  <Link
                    href={topicHref}
                    className={`flex items-center gap-2 px-4 py-1.5 text-[13px] border-l-2 ${
                      topicActive
                        ? "border-accent bg-bg-inset text-fg font-bold"
                        : "border-transparent text-fg-dim hover:bg-bg-inset hover:text-fg"
                    }`}
                  >
                    <span className="truncate">{topic.title}</span>
                  </Link>

                  <div className="ml-4 border-l border-border">
                    {topic.levels.map((level) => {
                      const levelHref = `/track/${track.id}/${topicSlug}/${level.id}`;
                      const active = pathname === levelHref;
                      return (
                        <Link
                          key={level.id}
                          href={levelHref}
                          className={`flex items-center gap-2 pl-4 pr-3 py-1 text-[12px] ${
                            active
                              ? "bg-bg-inset text-fg font-bold"
                              : "text-fg-dim hover:bg-bg-inset hover:text-fg"
                          }`}
                        >
                          <span className={`font-bold ${STATUS_COLOR[level.status]}`}>
                            {statusGlyph(level.status)}
                          </span>
                          <span>{level.id}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </nav>
  );
}
