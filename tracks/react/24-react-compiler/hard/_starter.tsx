import { useRef } from "react";

export interface SearchItem {
  id: string;
  name: string;
}

export function SearchResults({
  items,
  query,
}: {
  items: SearchItem[];
  query: string;
}) {
  "use no memo";

  const cache = useRef(
    new Map<string, SearchItem[]>(),
  );
  let visibleItems = cache.current.get(query);

  if (!visibleItems) {
    const normalizedQuery = query.toLocaleLowerCase("pl");
    visibleItems = items.filter((item) =>
      item.name
        .toLocaleLowerCase("pl")
        .includes(normalizedQuery),
    );
    cache.current.set(query, visibleItems);
  }

  return (
    <ul aria-label="Wyniki wyszukiwania">
      {visibleItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
