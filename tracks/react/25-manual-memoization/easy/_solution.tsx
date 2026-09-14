import { useMemo, useState } from "react";

export interface PriceLine {
  id: string;
  amount: number;
}

export function PricingPanel({
  lines,
  calculateTotal,
}: {
  lines: PriceLine[];
  calculateTotal: (lines: PriceLine[]) => number;
}) {
  const [note, setNote] = useState("");
  const total = useMemo(
    () => calculateTotal(lines),
    [calculateTotal, lines],
  );

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
