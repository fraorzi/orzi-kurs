import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface CounterContextValue {
  readonly count: number;
  readonly increment: () => void;
}

const CounterContext = createContext<CounterContextValue | null>(null);

function useCounter(): CounterContextValue {
  const value = useContext(CounterContext);
  if (!value) {
    throw new Error("Brak CounterProvider");
  }
  return value;
}

export function CounterProvider({ children }: { readonly children: ReactNode }) {
  const [count, setCount] = useState(0);

  return (
    <CounterContext
      value={{
        count,
        increment: () => setCount((current) => current + 1),
      }}
    >
      {children}
    </CounterContext>
  );
}

export function CounterValue() {
  const { count } = useCounter();
  return <output aria-label="Licznik">{count}</output>;
}

export function IncrementButton() {
  const { increment } = useCounter();
  return <button type="button" onClick={increment}>Zwiększ</button>;
}
