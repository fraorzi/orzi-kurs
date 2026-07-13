"use client";

import { useRef, useState } from "react";

const LABEL: Record<"D" | "O", string> = {
  D: "Debug — starter to zepsuty kod, który naprawiasz",
  O: "Optymalizacja — działający kod do przepisania na szybszy",
};

export default function TopicTag({ tag }: { tag: "D" | "O" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  function show() {
    const r = ref.current?.getBoundingClientRect();
    if (r) setPos({ top: r.top, left: r.left + r.width / 2 });
  }
  function hide() {
    setPos(null);
  }

  return (
    <span
      ref={ref}
      className={`tag ${tag.toLowerCase()}`}
      aria-label={LABEL[tag]}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {tag}
      {pos && (
        <span className="tag-tip" role="tooltip" style={{ top: pos.top, left: pos.left }}>
          {LABEL[tag]}
        </span>
      )}
    </span>
  );
}
