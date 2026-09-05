import { useEffect, useEffectEvent, useState } from "react";

export interface Ticker {
  subscribe(listener: () => void): () => void;
}

export interface StepCounterProps {
  step: number;
  ticker: Ticker;
}

export function StepCounter({
  step,
  ticker,
}: StepCounterProps) {
  const [count, setCount] = useState(0);
  const onTick = useEffectEvent(() => {
    setCount((current) => current + step);
  });

  useEffect(() => ticker.subscribe(onTick), [ticker]);

  return <output aria-label="Wynik">{count}</output>;
}
