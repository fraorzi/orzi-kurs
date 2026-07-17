import type { ReactNode } from "react";

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <nav aria-label="Workspace">
          <a href="/reports">Raporty</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
