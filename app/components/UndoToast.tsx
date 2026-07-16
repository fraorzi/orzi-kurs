"use client";

import { useEffect, useRef } from "react";
import type { TaskProgress } from "@/app/lib/types";
import type { TaskUndoRecord } from "@/shared/task-undo";

export default function UndoToast({
  record,
  busy,
  onUndo,
}: {
  record: TaskUndoRecord<TaskProgress>;
  busy: boolean;
  onUndo: () => void;
}) {
  const toastRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const remaining = Math.max(0, record.expiresAt - Date.now());
    const duration = Math.max(1, record.expiresAt - record.createdAt);
    const progress = Math.min(1, Math.max(0, 1 - remaining / duration));
    const timerElement = timerRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timerAnimation: Animation | null = null;

    if (timerElement) {
      timerElement.style.transform = `scaleX(${reduceMotion ? 1 : progress})`;
      if (!reduceMotion && remaining > 0) {
        timerAnimation = timerElement.animate(
          [
            { transform: `scaleX(${progress})` },
            { transform: "scaleX(1)" },
          ],
          { duration: remaining, easing: "linear", fill: "forwards" },
        );
      }
    }

    const closeTimer = window.setTimeout(
      () => toastRef.current?.classList.add("closing"),
      remaining,
    );
    return () => {
      timerAnimation?.cancel();
      window.clearTimeout(closeTimer);
    };
  }, [record.createdAt, record.expiresAt]);

  return (
    <div
      ref={toastRef}
      className="undo-toast"
      role="status"
    >
      <span className="undo-toast-message">{record.message}</span>
      <button onClick={onUndo} disabled={busy}>
        {busy ? "Cofam…" : "Cofnij"}
      </button>
      <span ref={timerRef} className="undo-toast-timer" aria-hidden="true" />
    </div>
  );
}
