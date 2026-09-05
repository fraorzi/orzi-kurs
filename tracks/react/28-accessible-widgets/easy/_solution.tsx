import { useState } from "react";

type SaveState = "idle" | "pending" | "success" | "error";

export function SaveSettings({
  save,
}: {
  save: () => Promise<void>;
}) {
  const [state, setState] = useState<SaveState>("idle");

  async function handleSave() {
    setState("pending");

    try {
      await save();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <section aria-label="Ustawienia">
      <button
        type="button"
        disabled={state === "pending"}
        onClick={handleSave}
      >
        {state === "pending"
          ? "Zapisywanie…"
          : "Zapisz ustawienia"}
      </button>
      {state === "success" && (
        <p role="status">Ustawienia zapisane</p>
      )}
      {state === "error" && (
        <p role="alert">Nie udało się zapisać</p>
      )}
    </section>
  );
}
