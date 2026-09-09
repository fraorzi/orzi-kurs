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
        if (query.trim()) {
          onSearch(query.trim());
        }
      }}
    >
      <label>
        Szukaj produktów
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <button type="submit">Szukaj</button>
      <button type="button" onClick={() => setQuery("")}>
        Wyczyść
      </button>
    </form>
  );
}
