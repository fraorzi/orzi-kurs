import type { ReactNode } from "react";

export default function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  void children;
  return (
    <section aria-label="Obszar roboczy">
      Brak treści
    </section>
  );
}
