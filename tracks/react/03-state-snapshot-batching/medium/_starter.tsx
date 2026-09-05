import { useState } from "react";

export function BatchCounter() {
  const [count, setCount] = useState(0);

  function addThree() {
    // TODO: addThree - zaimplementuj zachowanie opisane w poleceniu.
    throw new Error("TODO: addThree");
  }

  return (
    <section>
      <output aria-label="Wynik">{count}</output>
      <button type="button" onClick={addThree}>
        Dodaj 3
      </button>
    </section>
  );
}
