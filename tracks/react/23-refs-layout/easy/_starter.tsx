import { type Ref, useRef } from "react";

export function SearchField({
  ref: _ref,
}: {
  ref?: Ref<HTMLInputElement>;
}) {
  return (
    <label>
      Szukaj polecenia
      <input type="search" />
    </label>
  );
}

export function CommandPalette() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section aria-label="Paleta poleceń">
      <SearchField ref={inputRef} />
      <button
        type="button"
        onClick={() => inputRef.current?.focus()}
      >
        Przejdź do wyszukiwania
      </button>
    </section>
  );
}
