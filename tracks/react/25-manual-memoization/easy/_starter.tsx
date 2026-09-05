import { useState } from "react";

export interface PriceLine {
  readonly id: string;
  readonly amount: number;
}

export function PricingPanel({
  lines,
  calculateTotal,
}: {
  lines: readonly PriceLine[];
  calculateTotal: (lines: readonly PriceLine[]) => number;
}) {
  const [note, setNote] = useState("");
  const total = calculateTotal(lines);

  return (
    <section aria-label="Wycena">
      <p>Razem: {total} zł</p>
      <label>
        Notatka
        <input
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </label>
    </section>
  );
}
