import { useState } from "react";

export function BatchCounter() {
  const [count, setCount] = useState(0);

  function addThree() {
    setCount((current) => current + 1);
    setCount((current) => current + 1);
    setCount((current) => current + 1);
  }

  return (
    <section>
      <output aria-label="Wynik">{count}</output>
      <button type="button" onClick={addThree}>Dodaj 3</button>
    </section>
  );
}
