import { useState } from "react";

export interface ToggleDetailsProps {
  readonly details: string;
}

export function ToggleDetails({
  details,
}: ToggleDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {!isOpen ? "Pokaż szczegóły" : "Ukryj szczegóły"}
      </button>
      {isOpen ? <p>{details}</p> : null}
    </section>
  );
}
