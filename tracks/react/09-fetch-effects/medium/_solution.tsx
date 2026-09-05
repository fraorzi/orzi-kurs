import { useEffect, useState } from "react";

export interface SearchResultsProps {
  query: string;
  search: (query: string) => Promise<readonly string[]>;
}

interface SearchResult {
  readonly query: string;
  readonly items: readonly string[];
}

export function SearchResults({
  query,
  search,
}: SearchResultsProps) {
  const [result, setResult] = useState<SearchResult | null>(
    null,
  );
  const currentResult =
    result?.query === query ? result : null;

  useEffect(() => {
    let ignore = false;
    search(query).then((items) => {
      if (!ignore) {
        setResult({ query, items });
      }
    });

    return () => {
      ignore = true;
    };
  }, [query, search]);

  if (!currentResult) {
    return <p>Szukanie…</p>;
  }
  return (
    <ul aria-label="Wyniki">
      {currentResult.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
