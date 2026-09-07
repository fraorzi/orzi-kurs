"use client";

import { useEffect, useRef, useState } from "react";
import TrackBadge from "../TrackBadge";
import { IconCheck } from "../icons";
import type { Roadmap } from "@/app/lib/roadmap";
import styles from "./roadmap.module.css";

export default function CoursePicker({
  chapters,
  selectedId,
  onSelect,
}: {
  chapters: Roadmap["chapters"];
  selectedId: string | undefined;
  onSelect: (topicId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const selected = chapters.find((chapter) => chapter.id === selectedId) ?? chapters[0];

  useEffect(() => {
    if (!open) return;
    const menu = root.current?.querySelector('[role="menu"]');
    const first =
      menu?.querySelector<HTMLButtonElement>('[aria-checked="true"]') ??
      menu?.querySelector<HTMLButtonElement>("button");
    first?.focus({ preventScroll: true });
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus({ preventScroll: true });
      }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  if (!selected) return null;
  return (
    <div
      className={styles.coursePicker}
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        className={`trackswitch ${styles.courseTrigger}`}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="roadmap-courses"
        aria-label={`Wybierz kurs, ${selected.name}`}
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <TrackBadge id={selected.id} size="sm" />
        <span>{selected.name}</span>
        <svg
          className={styles.pickerChevron}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>
      {open && (
        <div
          className={`trackpop ${styles.courseMenu}`}
          id="roadmap-courses"
          role="menu"
          aria-label="Kursy na roadmapie"
          onKeyDown={(event) => {
            const items = Array.from(
              event.currentTarget.querySelectorAll<HTMLButtonElement>(
                'button[role="menuitemradio"]',
              ),
            );
            const index = items.findIndex((item) => item === document.activeElement);
            let next: number;
            switch (event.key) {
              case "ArrowDown":
                next = (index + 1) % items.length;
                break;
              case "ArrowUp":
                next = (index - 1 + items.length) % items.length;
                break;
              case "Home":
                next = 0;
                break;
              case "End":
                next = items.length - 1;
                break;
              default:
                return;
            }
            event.preventDefault();
            const item = items[next];
            item?.focus({ preventScroll: true });
            if (item) {
              const menu = event.currentTarget;
              if (item.offsetTop < menu.scrollTop) menu.scrollTop = item.offsetTop;
              else if (item.offsetTop + item.offsetHeight > menu.scrollTop + menu.clientHeight) {
                menu.scrollTop = item.offsetTop + item.offsetHeight - menu.clientHeight;
              }
            }
          }}
        >
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              type="button"
              role="menuitemradio"
              aria-checked={chapter.id === selected.id}
              className={`trackpop-item ${styles.courseOption}`}
              onClick={() => {
                const first = chapter.steps[0];
                if (first) onSelect(first.topic.id);
                setOpen(false);
                trigger.current?.focus({ preventScroll: true });
              }}
            >
              <TrackBadge id={chapter.id} />
              <span>
                {chapter.name}
                <small>
                  {chapter.passed} / {chapter.total} tematów
                </small>
              </span>
              {chapter.id === selected.id && <IconCheck className="ck" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
