import { useMemo, useState } from "react";

export interface RecordRow {
  id: string;
  title: string;
  status: "draft" | "published";
  secret: string;
  createdAt: Date;
}

export interface WidgetItem {
  id: string;
  title: string;
  createdAt: string;
}

export async function loadWidgetItems(
  fetchRows: () => Promise<RecordRow[]>,
): Promise<WidgetItem[]> {
  const rows = await fetchRows();

  return rows
    .filter((row) => row.status === "published")
    .map(({ id, title, createdAt }) => ({
      id,
      title,
      createdAt: createdAt.toISOString(),
    }));
}

export function Widget({ items }: { items: readonly WidgetItem[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [items, query],
  );

  return (
    <section>
      <label htmlFor="widget-filter">Filtruj</label>
      <input
        id="widget-filter"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {filtered.length === 0 ? (
        <p role="status">Brak wyników</p>
      ) : (
        <ul>
          {filtered.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
