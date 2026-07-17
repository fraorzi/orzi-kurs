import { useRef } from "react";

export interface FocusFieldProps {
  readonly label: string;
}

export function FocusField({ label }: FocusFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section>
      <label>
        {label}
        <input ref={inputRef} />
      </label>
      <button
        type="button"
        onClick={() => inputRef.current?.focus()}
      >
        Ustaw focus: {label}
      </button>
    </section>
  );
}
