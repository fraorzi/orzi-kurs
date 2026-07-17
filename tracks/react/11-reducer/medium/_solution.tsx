import {
  useReducer,
  useState,
} from "react";

export interface Task {
  readonly id: string;
  readonly title: string;
  readonly done: boolean;
}

type TaskAction =
  | { readonly type: "added"; readonly task: Task }
  | { readonly type: "toggled"; readonly id: string }
  | { readonly type: "deleted"; readonly id: string };

function tasksReducer(tasks: readonly Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "added":
      return [...tasks, action.task];
    case "toggled":
      return tasks.map((task) => (
        task.id === action.id ? { ...task, done: !task.done } : task
      ));
    case "deleted":
      return tasks.filter((task) => task.id !== action.id);
  }
}

export interface TaskBoardProps {
  readonly initialTasks: readonly Task[];
  readonly createId: () => string;
}

export function TaskBoard({ initialTasks, createId }: TaskBoardProps) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks,
  );
  const [draft, setDraft] = useState("");

  return (
    <section>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (draft.trim()) {
            dispatch({
              type: "added",
              task: { id: createId(), title: draft.trim(), done: false },
            });
            setDraft("");
          }
        }}
      >
        <label>
          Nowe zadanie
          <input
            value={draft}
            onChange={(event) => setDraft(event.currentTarget.value)}
          />
        </label>
        <button type="submit">Dodaj</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => dispatch({ type: "toggled", id: task.id })}
              />
              {task.title}
            </label>
            <button
              type="button"
              onClick={() => dispatch({ type: "deleted", id: task.id })}
            >
              Usuń {task.title}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
