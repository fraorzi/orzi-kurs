import { useReducer, useState } from "react";

export interface Task {
  readonly id: string;
  readonly title: string;
  done: boolean;
}

type TaskAction =
  | { readonly type: "added"; readonly task: Task }
  | { readonly type: "toggled"; readonly id: string }
  | { readonly type: "deleted"; readonly id: string };

function tasksReducer(
  tasks: Task[],
  action: TaskAction,
): Task[] {
  switch (action.type) {
    case "added":
      tasks.push(action.task);
      return tasks;
    case "toggled": {
      const task = tasks.find(
        (candidate) => candidate.id === action.id,
      );
      if (task) {
        task.done = !task.done;
      }
      return tasks;
    }
    case "deleted":
      return tasks;
  }
}

export interface TaskBoardProps {
  initialTasks: readonly Task[];
  createId: () => string;
}

export function TaskBoard({
  initialTasks,
  createId,
}: TaskBoardProps) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks.map((task) => ({ ...task })),
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
              task: {
                id: createId(),
                title: draft.trim(),
                done: false,
              },
            });
            setDraft("");
          }
        }}
      >
        <label>
          Nowe zadanie
          <input
            value={draft}
            onChange={(event) =>
              setDraft(event.currentTarget.value)
            }
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
                onChange={() =>
                  dispatch({ type: "toggled", id: task.id })
                }
              />
              {task.title}
            </label>
            <button
              type="button"
              onClick={() =>
                dispatch({ type: "deleted", id: task.id })
              }
            >
              Usuń {task.title}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
