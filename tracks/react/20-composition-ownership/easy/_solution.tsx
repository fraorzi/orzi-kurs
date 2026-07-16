import { useState } from "react";

function TextField({
  label,
  value,
  onChange,
}: {
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
}) {
  return (
    <label>
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function SyncedFields() {
  const [value, setValue] = useState("");

  return (
    <section>
      <TextField
        label="Nazwa publiczna"
        value={value}
        onChange={setValue}
      />
      <TextField
        label="Podgląd nazwy"
        value={value}
        onChange={setValue}
      />
    </section>
  );
}
