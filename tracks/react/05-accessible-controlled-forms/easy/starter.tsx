import { useState } from "react";

export interface ProductSearchProps {
  readonly onSearch: (query: string) => void;
}

export function ProductSearch({ onSearch }: ProductSearchProps) {
  const [query] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(query);
      }}
    >
      <label>
        Szukaj produktów
        <input defaultValue={query} />
      </label>
      <button type="submit">Szukaj</button>
      <button type="button">Wyczyść</button>
    </form>
  );
}
