import { useState } from "react";

export function BatchCounter() {
  const [count, setCount] = useState(0);

  function addThree() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  return (
    <section>
      <output aria-label="Wynik">{count}</output>
      <button type="button" onClick={addThree}>Dodaj 3</button>
    </section>
  );
}
