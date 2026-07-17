import { useState } from "react";
import { useTaskDispatch } from "./context";

export function AddTaskForm({
  createId,
}: {
  readonly createId: () => string;
}) {
  const [draft, setDraft] = useState("");
  const dispatch = useTaskDispatch();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const title = draft.trim();
        if (!title) {
          return;
        }
        dispatch({
          type: "task_added",
          task: { id: createId(), title, done: false },
        });
        setDraft("");
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
  );
}
