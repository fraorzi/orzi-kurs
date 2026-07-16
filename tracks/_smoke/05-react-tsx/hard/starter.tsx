import { useState } from "react";

export interface ConditionalCounterProps {
  readonly enabled: boolean;
}

export function ConditionalCounter({ enabled }: ConditionalCounterProps) {
  if (enabled) {
    const [count, setCount] = useState(0);
    return (
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Kliknięcia: {count}
      </button>
    );
  }

  return <p>Licznik wyłączony</p>;
}
