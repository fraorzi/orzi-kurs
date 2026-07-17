import {
  useTaskDispatch,
  useTaskState,
} from "./context";
import { selectVisibleTasks } from "./selectors";

export function TaskList() {
  const tasks = selectVisibleTasks(useTaskState());
  const dispatch = useTaskDispatch();

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
              onChange={() => {
                dispatch({ type: "task_toggled", id: task.id });
              }}
            />
            {task.title}
          </label>
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "task_deleted", id: task.id });
            }}
          >
            Usuń {task.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
