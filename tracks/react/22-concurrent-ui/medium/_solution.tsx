import {
  Suspense,
  useDeferredValue,
  useState,
} from "react";

export interface CatalogResource {
  read(query: string): readonly string[];
}

function SearchResults({
  query,
  resource,
}: {
  readonly query: string;
  readonly resource: CatalogResource;
}) {
  return (
    <ul>
      {resource.read(query).map((result) => (
        <li key={result}>{result}</li>
      ))}
    </ul>
  );
}

export function CatalogSearch({
  resource,
}: {
  readonly resource: CatalogResource;
}) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <section aria-label="Wyszukiwarka katalogu">
      <label>
        Szukaj w katalogu
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      {isStale && <p role="status">Aktualizowanie wyników…</p>}

      <Suspense fallback={<p>Ładowanie wyników…</p>}>
        <div aria-busy={isStale}>
          <SearchResults query={deferredQuery} resource={resource} />
        </div>
      </Suspense>
    </section>
  );
}

