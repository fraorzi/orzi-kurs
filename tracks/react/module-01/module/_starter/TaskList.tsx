import { useTaskState } from "./context";
import { selectVisibleTasks } from "./selectors";

export function TaskList() {
  const tasks = selectVisibleTasks(useTaskState());

  if (tasks.length === 0) {
    return <p>Brak zadań dla tego filtra.</p>;
  }

  return (
    <ul aria-label="Zadania">
      {tasks.map((task) => (
        <li key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.done}
              readOnly
            />
            {task.title}
          </label>
          <button type="button">Usuń {task.title}</button>
        </li>
      ))}
    </ul>
  );
}
