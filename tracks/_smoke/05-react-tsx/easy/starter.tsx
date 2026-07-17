import { useState } from "react";

export function Counter() {
  const [count] = useState(0);

  return <button type="button">Kliknięcia: {count}</button>;
}
