import { useTaskState } from "./context";

export function TaskFilters() {
  const state = useTaskState();

  return (
    <div aria-label="Filtry zadań" role="group">
      <button type="button" aria-pressed={state.filter === "all"}>
        Wszystkie
      </button>
      <button type="button" aria-pressed={state.filter === "open"}>
        Otwarte
      </button>
      <button type="button" aria-pressed={state.filter === "done"}>
        Gotowe
      </button>
    </div>
  );
}
