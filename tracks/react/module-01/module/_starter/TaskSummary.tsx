import { useTaskState } from "./context";
import { selectTaskCounts } from "./selectors";

export function TaskSummary() {
  const counts = selectTaskCounts(useTaskState());

  return (
    <section aria-label="Podsumowanie">
      <output aria-label="Otwarte zadania">
        {counts.open}
      </output>
      <output aria-label="Gotowe zadania">
        {counts.done}
      </output>
    </section>
  );
}
