import { useState } from "react";

export interface ToggleDetailsProps {
  readonly details: string;
}

export function ToggleDetails({ details }: ToggleDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? "Ukryj szczegóły" : "Pokaż szczegóły"}
      </button>
      {isOpen ? <p>{details}</p> : null}
    </section>
  );
}
