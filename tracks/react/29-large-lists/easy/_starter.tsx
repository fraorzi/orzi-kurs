import { useState } from "react";

export interface QueueItem {
  readonly id: string;
  readonly title: string;
}

function QueueRow({ item }: { item: QueueItem }) {
  const [note, setNote] = useState("");

  return (
    <li>
      <span>{item.title}</span>
      <label>
        Notatka dla {item.title}
        <input
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </label>
    </li>
  );
}

export function EditableQueue({
  initialItems,
}: {
  initialItems: readonly QueueItem[];
}) {
  const [items, setItems] = useState(initialItems);

  return (
    <section aria-label="Kolejka">
      <button
        type="button"
        onClick={() =>
          setItems((current) => [...current].reverse())
        }
      >
        Odwróć kolejność
      </button>
      <ul>
        {items.map((item, index) => (
          <QueueRow key={index} item={item} />
        ))}
      </ul>
    </section>
  );
}
