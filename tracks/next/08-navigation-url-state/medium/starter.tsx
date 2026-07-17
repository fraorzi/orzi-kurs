"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

export function CatalogSearch() {
  const router = useRouter();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get("query") ?? "");
    router.push(`/catalog?query=${encodeURIComponent(query)}`);
  }

  return <form aria-label="Wyszukiwanie katalogu" onSubmit={submit}>
    <label>Query <input name="query" /></label>
    <button type="submit">Szukaj</button>
  </form>;
}
