import { useState } from "react";

export interface ToggleDetailsProps {
  readonly details: string;
}

export function ToggleDetails({ details }: ToggleDetailsProps) {
  const [isOpen] = useState(false);

  return (
    <section>
      <button type="button">Pokaż szczegóły</button>
      {isOpen ? <p>{details}</p> : null}
    </section>
  );
}
