import { useId } from "react";

export interface ApiKeyFieldProps {
  readonly label: string;
  readonly hint: string;
}

export function ApiKeyField({ label, hint }: ApiKeyFieldProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={`${id}-input`}>{label}</label>
      <input
        id={`${id}-input`}
        aria-describedby={`${id}-hint`}
      />
      <p id={`${id}-hint`}>{hint}</p>
    </div>
  );
}
