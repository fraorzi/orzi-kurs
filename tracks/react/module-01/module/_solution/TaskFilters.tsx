import {
  useTaskDispatch,
  useTaskState,
} from "./context";
import type { TaskFilter } from "./types";

const FILTERS: readonly {
  readonly value: TaskFilter;
  readonly label: string;
}[] = [
  { value: "all", label: "Wszystkie" },
  { value: "open", label: "Otwarte" },
  { value: "done", label: "Gotowe" },
];

export function TaskFilters() {
  const state = useTaskState();
  const dispatch = useTaskDispatch();

  return (
    <div aria-label="Filtry zadań" role="group">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          aria-pressed={state.filter === filter.value}
          onClick={() => {
            dispatch({ type: "filter_changed", filter: filter.value });
          }}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
