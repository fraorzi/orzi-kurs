"use client";

import { useEffect } from "react";

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
    <section role="alert">
      <h2>Nie udało się wczytać produktu</h2>
      {error.digest && (
        <p>Identyfikator błędu: {error.digest}</p>
      )}
      <button type="button" onClick={unstable_retry}>
        Spróbuj ponownie
      </button>
    </section>
  );
}
