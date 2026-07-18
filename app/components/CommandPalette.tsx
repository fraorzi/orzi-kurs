"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Catalog, TaskStatus } from "@/app/lib/types";
import { topicSlug, topicNumber } from "@/app/lib/tracks";
import { IconClose } from "./icons";
import styles from "./shell.module.css";

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "input:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

interface Item {
  label: string;
  sub: string;
  status: TaskStatus;
  href: string;
}

interface Props {
  catalog: Catalog | null;
  catalogStatus: "loading" | "error" | "success";
  onClose: () => void;
  onRetryCatalog: () => void;
}

export default function CommandPalette({ catalog, catalogStatus, onClose, onRetryCatalog }: Props) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
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
  const resultsAvailable = catalogStatus === "success" && results.length > 0;

  useEffect(() => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    inputRef.current?.focus();
    return () => {
      const element = returnFocusRef.current;
      window.requestAnimationFrame(() => {
        if (element?.isConnected) element.focus();
      });
    };
  }, []);

  useEffect(() => {
    if (resultsAvailable) {
      document.getElementById(`command-option-${active}`)?.scrollIntoView({ block: "nearest" });
    }
  }, [active, resultsAvailable]);

  function pick(i: number) {
    const it = results[i];
    if (!it) return;
    onClose();
    router.push(it.href);
  }

  function onKey(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "Tab") {
      const elements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [],
      ).filter((element) => element.offsetParent !== null);
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
    } else if (
      event.key === "ArrowDown" &&
      document.activeElement === inputRef.current &&
      resultsAvailable
    ) {
      event.preventDefault();
      setSel(active === results.length - 1 ? 0 : active + 1);
    } else if (
      event.key === "ArrowUp" &&
      document.activeElement === inputRef.current &&
      resultsAvailable
    ) {
      event.preventDefault();
      setSel(active === 0 ? results.length - 1 : active - 1);
    } else if (
      event.key === "Home" &&
      document.activeElement === inputRef.current &&
      resultsAvailable
    ) {
      event.preventDefault();
      setSel(0);
    } else if (
      event.key === "End" &&
      document.activeElement === inputRef.current &&
      resultsAvailable
    ) {
      event.preventDefault();
      setSel(results.length - 1);
    } else if (
      event.key === "Enter" &&
      document.activeElement === inputRef.current &&
      resultsAvailable
    ) {
      event.preventDefault();
      pick(active);
    }
  }

  return (
    <div className="kmask" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className={`kbox ${styles.paletteBox}`}
        id="command-palette"
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
        onKeyDown={onKey}
      >
        <h2 className={styles.visuallyHidden} id="command-palette-title">Szybkie wyszukiwanie zadań</h2>
        <label className={styles.visuallyHidden} htmlFor="command-palette-input">Szukaj zadania</label>
        <button className={styles.paletteClose} type="button" aria-label="Zamknij wyszukiwanie" onClick={onClose}>
          <IconClose />
        </button>
        <input
          ref={inputRef}
          className={`kinput ${styles.paletteInput}`}
          id="command-palette-input"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded="true"
          aria-controls="command-palette-results"
          aria-activedescendant={resultsAvailable ? `command-option-${active}` : undefined}
          aria-describedby="command-palette-status"
          placeholder="Skocz do zadania — np. „domknięcia hard”…"
          autoComplete="off"
          spellCheck={false}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSel(0);
          }}
        />
        <span className={styles.visuallyHidden} id="command-palette-status" role="status">
          {catalogStatus === "loading"
            ? "Ładowanie programu"
            : catalogStatus === "error"
              ? "Nie udało się wczytać programu"
              : `${results.length} wyników`}
        </span>
        <div className="klist" id="command-palette-results" role="listbox" aria-busy={catalogStatus === "loading"}>
          {catalogStatus === "loading" ? (
            <div className="kempty">Ładowanie programu…</div>
          ) : catalogStatus === "error" ? (
            <div className="kempty">Nie udało się wczytać programu</div>
          ) : results.length === 0 ? (
            <div className="kempty">Brak dopasowań</div>
          ) : (
            results.map((it, i) => (
              <button
                key={it.href}
                id={`command-option-${i}`}
                className={`kitem${i === active ? " sel" : ""}`}
                role="option"
                aria-selected={i === active}
                tabIndex={-1}
                onMouseMove={() => setSel(i)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => pick(i)}
              >
                <span className={`sdot ${it.status}`} />
                <span>{it.label}</span>
                <span className="kt">{it.sub}</span>
              </button>
            ))
          )}
        </div>
        {catalogStatus === "error" && (
          <div className={styles.paletteState}>
            <span>Sprawdź lokalny runner i spróbuj ponownie.</span>
            <button type="button" onClick={onRetryCatalog}>Spróbuj ponownie</button>
          </div>
        )}
      </div>
    </div>
  );
}
