import { useState } from "react";

export function SaveSettings({
  save,
}: {
  readonly save: () => Promise<void>;
}) {
  const [message, setMessage] = useState("");

  async function handleSave() {
    try {
      await save();
      setMessage("Ustawienia zapisane");
    } catch {
      setMessage("Nie udało się zapisać");
    }
  }

  return (
    <section aria-label="Ustawienia">
      <button type="button" onClick={handleSave}>
        Zapisz ustawienia
      </button>
      {message && <p>{message}</p>}
    </section>
  );
}
