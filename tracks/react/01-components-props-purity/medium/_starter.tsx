import type { ReactNode } from "react";

export interface PanelProps {
  title: string;
  children: ReactNode;
  tone?: "info" | "warning";
}

export function Panel(_props: PanelProps) {
  return <div>TODO: panel</div>;
}
