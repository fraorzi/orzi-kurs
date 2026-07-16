import type { ReactNode } from "react";

export default function WorkspaceLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  void children;
  return <section aria-label="Obszar roboczy">Brak treści</section>;
}
