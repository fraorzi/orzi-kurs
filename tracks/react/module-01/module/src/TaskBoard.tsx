import { AddTaskForm } from "./AddTaskForm";
import { TaskProvider } from "./context";
import { TaskFilters } from "./TaskFilters";
import { TaskList } from "./TaskList";
import { TaskSummary } from "./TaskSummary";
import type { TeamTask } from "./types";

export function TaskBoard({
  initialTasks,
  createId,
}: {
  readonly initialTasks: readonly TeamTask[];
  readonly createId: () => string;
}) {
  return (
    <TaskProvider initialTasks={initialTasks}>
      <h1>Tablica zespołu</h1>
      <TaskSummary />
      <AddTaskForm createId={createId} />
      <TaskFilters />
      <TaskList />
    </TaskProvider>
  );
}
