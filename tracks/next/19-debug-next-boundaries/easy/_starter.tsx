"use client";

export function HydrationClock({
  initialText: _initialText,
  getCurrentText,
}: {
  initialText: string;
  getCurrentText: () => string;
}) {
  return <time>{getCurrentText()}</time>;
}
