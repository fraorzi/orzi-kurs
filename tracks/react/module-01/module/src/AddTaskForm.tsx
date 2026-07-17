import { useState } from "react";

export function AddTaskForm({
  createId: _createId,
}: {
  readonly createId: () => string;
}) {
  const [draft, setDraft] = useState("");

  return (
    <form onSubmit={(event) => event.preventDefault()}>
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
