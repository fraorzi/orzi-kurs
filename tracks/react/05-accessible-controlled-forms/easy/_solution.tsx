import { useState } from "react";

export interface ProductSearchProps {
  onSearch: (query: string) => void;
}

export function ProductSearch({
  onSearch,
}: ProductSearchProps) {
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const normalizedQuery = query.trim();
        if (normalizedQuery) {
          onSearch(normalizedQuery);
        }
      }}
    >
      <label>
        Szukaj produktów
        <input
          value={query}
          onChange={(event) =>
            setQuery(event.currentTarget.value)
          }
        />
      </label>
      <button type="submit">Szukaj</button>
      <button type="button" onClick={() => setQuery("")}>
        Wyczyść
      </button>
    </form>
  );
}
