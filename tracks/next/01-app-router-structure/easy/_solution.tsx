import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <a href="#main-content">Przejdź do treści</a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
