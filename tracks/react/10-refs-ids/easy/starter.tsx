export interface FocusFieldProps {
  readonly label: string;
}

export function FocusField({ label }: FocusFieldProps) {
  return (
    <section>
      <label>
        {label}
        <input />
      </label>
      <button
        type="button"
        onClick={() => document.querySelector("input")?.focus()}
      >
        Ustaw focus: {label}
      </button>
    </section>
  );
}
