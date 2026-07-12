"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Catalog, TaskStatus } from "@/app/lib/types";
import { topicSlug, topicNumber } from "@/app/lib/tracks";

interface Item {
  label: string;
  sub: string;
  status: TaskStatus;
  href: string;
}

interface Props {
  catalog: Catalog | null;
  onClose: () => void;
}

export default function CommandPalette({ catalog, onClose }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);

  const items = useMemo<Item[]>(() => {
    if (!catalog) return [];
    const out: Item[] = [];
    for (const track of catalog.tracks) {
      for (const topic of track.topics) {
        const slug = topicSlug(topic.id);
        for (const level of topic.levels) {
          out.push({
            label: `${topic.title} — ${level.id}`,
            sub: `${track.id}/${topicNumber(topic.id)} · ${level.id}`,
            status: level.status,
            href: `/track/${track.id}/${slug}/${level.id}`,
          });
        }
      }
    }
    return out;
  }, [catalog]);

  const results = useMemo(() => {
    const words = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return items
      .filter((it) => words.every((w) => (it.label + " " + it.sub).toLowerCase().includes(w)))
      .slice(0, 40);
  }, [items, q]);

  // clamp selection into range during render — no state sync needed
  const active = results.length === 0 ? 0 : Math.min(sel, results.length - 1);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function pick(i: number) {
    const it = results[i];
    if (!it) return;
    onClose();
    router.push(it.href);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel(Math.min(active + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel(Math.max(active - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      pick(active);
    }
  }

  return (
    <div className="kmask" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="kbox" role="dialog" aria-label="Szybkie wyszukiwanie zadań">
        <input
          ref={inputRef}
          className="kinput"
          placeholder="Skocz do zadania — np. „domknięcia hard”…"
          autoComplete="off"
          spellCheck={false}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSel(0);
          }}
          onKeyDown={onKey}
        />
        <div className="klist" role="listbox">
          {results.length === 0 ? (
            <div className="kempty">Brak dopasowań</div>
          ) : (
            results.map((it, i) => (
              <button
                key={it.href}
                className={`kitem${i === active ? " sel" : ""}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setSel(i)}
                onClick={() => pick(i)}
              >
                <span className={`sdot ${it.status}`} />
                <span>{it.label}</span>
                <span className="kt">{it.sub}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
