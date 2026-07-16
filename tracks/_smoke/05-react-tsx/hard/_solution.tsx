import { useState } from "react";

export interface ConditionalCounterProps {
  readonly enabled: boolean;
}

export function ConditionalCounter({ enabled }: ConditionalCounterProps) {
  const [count, setCount] = useState(0);

  if (!enabled) return <p>Licznik wyłączony</p>;

  return (
    <button type="button" onClick={() => setCount((value) => value + 1)}>
      Kliknięcia: {count}
    </button>
  );
}
