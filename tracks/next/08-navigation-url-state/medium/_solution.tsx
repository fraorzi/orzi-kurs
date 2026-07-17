"use client";

import type { FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function CatalogSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get("query") ?? "").trim();
    const next = new URLSearchParams(searchParams.toString());
    if (query) next.set("query", query);
    else next.delete("query");
    next.delete("page");
    router.replace(next.size ? `${pathname}?${next}` : pathname);
  }

  return <form aria-label="Wyszukiwanie katalogu" onSubmit={submit}>
    <label>Query <input name="query" defaultValue={searchParams.get("query") ?? ""} /></label>
    <button type="submit">Szukaj</button>
  </form>;
}
