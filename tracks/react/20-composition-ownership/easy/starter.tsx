import { useState } from "react";

function TextField({ label }: { readonly label: string }) {
  const [value, setValue] = useState("");

  return (
    <label>
      {label}
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </label>
  );
}

export function SyncedFields() {
  return (
    <section>
      <TextField label="Nazwa publiczna" />
      <TextField label="Podgląd nazwy" />
    </section>
  );
}
