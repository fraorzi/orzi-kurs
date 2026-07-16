import { useState } from "react";

export function ExpandableDetails({
  enabled,
}: {
  readonly enabled: boolean;
}) {
  if (!enabled) {
    return <p>Funkcja wyłączona</p>;
  }

  const [expanded, setExpanded] = useState(false);

  return (
    <section>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? "Ukryj szczegóły" : "Pokaż szczegóły"}
      </button>
      {expanded && <p>Szczegóły wdrożenia</p>}
    </section>
  );
}

