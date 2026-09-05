import { useState } from "react";

export interface DelayedCounterProps {
  wait: () => Promise<void>;
}

export function DelayedCounter({
  wait,
}: DelayedCounterProps) {
  const [count, setCount] = useState(0);

  async function incrementAfterWait() {
    // TODO: incrementAfterWait - zaimplementuj zachowanie opisane w poleceniu.
    throw new Error("TODO: incrementAfterWait");
  }

  return (
    <section>
      <output aria-label="Wynik">{count}</output>
      <button type="button" onClick={incrementAfterWait}>
        Dodaj po zakończeniu
      </button>
    </section>
  );
}
