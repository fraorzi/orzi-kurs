import { useState } from "react";

export interface DelayedCounterProps {
  readonly wait: () => Promise<void>;
}

export function DelayedCounter({ wait }: DelayedCounterProps) {
  const [count, setCount] = useState(0);

  async function incrementAfterWait() {
    await wait();
    setCount((current) => current + 1);
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
