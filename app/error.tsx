"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
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
    <div className="wrap state-page">
      <p className="state-kicker">Nie udało się otworzyć tego widoku</p>
      <h1>Coś przerwało ładowanie</h1>
      <p>Twoje rozwiązania i postęp nie zostały zmienione. Spróbuj ponownie albo wróć na stronę główną.</p>
      <div className="state-actions">
        <button className="submit" type="button" onClick={unstable_retry}>Spróbuj ponownie</button>
        <Link className="btn-ghost" href="/">Wróć do strony głównej</Link>
      </div>
      {error.digest && <small className="state-digest">Identyfikator błędu: {error.digest}</small>}
    </div>
  );
}
