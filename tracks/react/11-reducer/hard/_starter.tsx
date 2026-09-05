import { useReducer } from "react";

type Status = "backlog" | "doing" | "done";

interface HistoryState {
  readonly past: readonly Status[];
  readonly present: Status;
  readonly future: readonly Status[];
}

type HistoryAction =
  | { readonly type: "changed"; readonly status: Status }
  | { readonly type: "undone" }
  | { readonly type: "redone" };

function createHistory(
  initialStatus: Status,
): HistoryState {
  return { past: [], present: initialStatus, future: [] };
}

function historyReducer(
  state: HistoryState,
  action: HistoryAction,
): HistoryState {
  switch (action.type) {
    case "changed":
      if (action.status === state.present) {
        return state;
      }
      return {
        past: [...state.past, state.present],
        present: action.status,
        future: state.future,
      };
    case "undone": {
      const previous = state.past.at(-1);
      if (!previous) {
        return state;
      }
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      };
    }
    case "redone": {
      const [next, ...remaining] = state.future;
      if (!next) {
        return state;
      }
      return {
        past: [...state.past, state.present],
        present: next,
        future: remaining,
      };
    }
  }
}

export function WorkflowHistory({
  initialStatus,
}: {
  initialStatus: Status;
}) {
  const [history, dispatch] = useReducer(
    historyReducer,
    initialStatus,
    createHistory,
  );

  return (
    <section>
      <output aria-label="Status">{history.present}</output>
      <button
        type="button"
        onClick={() =>
          dispatch({ type: "changed", status: "backlog" })
        }
      >
        Ustaw backlog
      </button>
      <button
        type="button"
        onClick={() =>
          dispatch({ type: "changed", status: "doing" })
        }
      >
        Ustaw w toku
      </button>
      <button
        type="button"
        onClick={() =>
          dispatch({ type: "changed", status: "done" })
        }
      >
        Ustaw gotowe
      </button>
      <button
        type="button"
        disabled={history.past.length === 0}
        onClick={() => dispatch({ type: "undone" })}
      >
        Cofnij
      </button>
      <button
        type="button"
        disabled={history.future.length === 0}
        onClick={() => dispatch({ type: "redone" })}
      >
        Ponów
      </button>
    </section>
  );
}
