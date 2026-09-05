export interface SearchItem {
  readonly id: string;
  readonly name: string;
}

export function SearchResults({
  items,
  query,
}: {
  items: readonly SearchItem[];
  query: string;
}) {
  const normalizedQuery = query.toLocaleLowerCase("pl");
  const visibleItems = items.filter((item) =>
    item.name
      .toLocaleLowerCase("pl")
      .includes(normalizedQuery),
  );

  return (
    <ul aria-label="Wyniki wyszukiwania">
      {visibleItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
