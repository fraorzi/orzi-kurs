"use client";

export function HydrationClock({
  initialText: _initialText,
  getCurrentText,
}: {
  readonly initialText: string;
  readonly getCurrentText: () => string;
}) {
  return <time>{getCurrentText()}</time>;
}
