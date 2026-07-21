import { useState } from "react";

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
  return fetchRows() as unknown as Promise<WidgetItem[]>;
}

export function Widget({ items }: { items: readonly WidgetItem[] }) {
  const [query, setQuery] = useState("");

  return (
    <section>
      <label htmlFor="widget-filter">Filtruj</label>
      <input
        id="widget-filter"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </section>
  );
}
