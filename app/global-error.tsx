"use client";

import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pl">
      <body>
        <main className="global-failure">
          <p className="state-kicker">orzi·kurs</p>
          <h1>Aplikacja nie mogła się uruchomić</h1>
          <p>Pliki kursu pozostały bez zmian. Spróbuj ponownie za chwilę.</p>
          <button className="submit" type="button" onClick={unstable_retry}>Uruchom ponownie</button>
          {error.digest && <small className="state-digest">Identyfikator błędu: {error.digest}</small>}
        </main>
      </body>
    </html>
  );
}
