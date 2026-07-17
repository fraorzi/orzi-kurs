import type { ReactNode } from "react";

export interface PanelProps {
  readonly title: string;
  readonly children: ReactNode;
  readonly tone?: "info" | "warning";
}

export function Panel({
  title,
  children,
  tone = "info",
}: PanelProps) {
  return (
    <section aria-label={title} data-tone={tone}>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
