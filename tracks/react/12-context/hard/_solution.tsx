import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

type CounterAction = { readonly type: "incremented" };

const CounterStateContext = createContext<number | null>(
  null,
);
const CounterDispatchContext =
  createContext<Dispatch<CounterAction> | null>(null);

function counterReducer(
  state: number,
  action: CounterAction,
): number {
  return action.type === "incremented" ? state + 1 : state;
}

function useCounterState(): number {
  const state = useContext(CounterStateContext);
  if (state === null) {
    throw new Error("Brak CounterProvider");
  }
  return state;
}

function useCounterDispatch(): Dispatch<CounterAction> {
  const dispatch = useContext(CounterDispatchContext);
  if (!dispatch) {
    throw new Error("Brak CounterProvider");
  }
  return dispatch;
}

export function CounterProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <CounterStateContext value={count}>
      <CounterDispatchContext value={dispatch}>
        {children}
      </CounterDispatchContext>
    </CounterStateContext>
  );
}

export function CounterValue() {
  const count = useCounterState();
  return <output aria-label="Licznik">{count}</output>;
}

export function IncrementButton() {
  const dispatch = useCounterDispatch();
  return (
    <button
      type="button"
      onClick={() => dispatch({ type: "incremented" })}
    >
      Zwiększ
    </button>
  );
}
