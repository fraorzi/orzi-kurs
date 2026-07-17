import { useState } from "react";

export function DeleteAccountDialog({
  onConfirm,
}: {
  readonly onConfirm: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <button type="button" onClick={() => setIsOpen(true)}>
        Usuń konto
      </button>
      {isOpen && (
        <div>
          <h2>Usuń konto?</h2>
          <p>Tej operacji nie można cofnąć.</p>
          <button type="button" onClick={() => setIsOpen(false)}>
            Anuluj
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              setIsOpen(false);
            }}
          >
            Potwierdź usunięcie
          </button>
        </div>
      )}
    </section>
  );
}
