import type { ReactNode } from "react";

export default function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section aria-label="Obszar roboczy">
      <nav aria-label="Workspace">
        <a href="/reports">Raporty</a>
      </nav>
      <main>{children}</main>
    </section>
  );
}
