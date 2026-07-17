import {
  useEffect,
  useState,
} from "react";

export interface Ticker {
  subscribe(listener: () => void): () => void;
}

export interface StepCounterProps {
  readonly step: number;
  readonly ticker: Ticker;
}

export function StepCounter({ step, ticker }: StepCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => (
    ticker.subscribe(() => {
      setCount((current) => current + step);
    })
  ), [ticker]);

  return <output aria-label="Wynik">{count}</output>;
}
