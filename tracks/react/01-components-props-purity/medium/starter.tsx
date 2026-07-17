import type { ReactNode } from "react";

export interface PanelProps {
  readonly title: string;
  readonly children: ReactNode;
  readonly tone?: "info" | "warning";
}

export function Panel(_props: PanelProps) {
  return <div>TODO: panel</div>;
}
