import { useState } from "react";

export function FilterButton() {
  const [active, setActive] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => setActive((value) => !value)}
    >
      {active ? "Pokaż wszystkie" : "Tylko aktywne"}
    </button>
  );
}
