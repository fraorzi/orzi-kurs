import type { ReactNode } from "react";

export interface PanelProps {
  title: string;
  children: ReactNode;
  tone?: "info" | "warning";
}

export function Panel({
  title,
  children,
  tone = "info",
}: PanelProps) {
  return (
    <section data-tone={tone}>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
