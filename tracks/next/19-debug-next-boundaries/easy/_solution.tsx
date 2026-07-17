"use client";

import { useEffect, useState } from "react";

export function HydrationClock({
  initialText,
  getCurrentText,
}: {
  readonly initialText: string;
  readonly getCurrentText: () => string;
}) {
  const [text, setText] = useState(initialText);
  useEffect(() => {
    const timeout = setTimeout(() => setText(getCurrentText()), 0);
    return () => clearTimeout(timeout);
  }, [getCurrentText]);
  return <time>{text}</time>;
}
