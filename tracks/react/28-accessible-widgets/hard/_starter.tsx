import {
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export function DeleteAccountDialog({
  onConfirm,
}: {
  onConfirm: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // TODO: przenieś focus do przycisku Anuluj.
    // TODO: po zamknięciu przywróć focus do przycisku Usuń konto.
  }, [isOpen]);

  function handleKeyDown(
    event: KeyboardEvent<HTMLDivElement>,
  ) {
    // TODO: handleKeyDown - zaimplementuj zachowanie opisane w poleceniu.
    throw new Error("TODO: handleKeyDown");
  }

  return (
    <section>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Usuń konto
      </button>
      {isOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onKeyDown={handleKeyDown}
          >
            <h2 id={titleId}>Usuń konto?</h2>
            <p>Tej operacji nie można cofnąć.</p>
            <button
              ref={cancelRef}
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Anuluj
            </button>
            <button
              ref={confirmRef}
              type="button"
              onClick={() => {
                onConfirm();
                setIsOpen(false);
              }}
            >
              Potwierdź usunięcie
            </button>
          </div>,
          document.body,
        )}
    </section>
  );
}
