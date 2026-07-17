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
  readonly onConfirm: () => void;
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

    cancelRef.current?.focus();
    return () => triggerRef.current?.focus();
  }, [isOpen]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    if (event.shiftKey && document.activeElement === cancelRef.current) {
      event.preventDefault();
      confirmRef.current?.focus();
    } else if (!event.shiftKey && document.activeElement === confirmRef.current) {
      event.preventDefault();
      cancelRef.current?.focus();
    }
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
      {isOpen && createPortal(
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
