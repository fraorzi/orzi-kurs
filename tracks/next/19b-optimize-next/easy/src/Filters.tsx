import { useState } from "react";

export function Filters() {
  const [period, setPeriod] = useState("7d");
  return (
    <label>Okres<select value={period} onChange={(event) => setPeriod(event.target.value)}>
      <option value="7d">7 dni</option><option value="30d">30 dni</option>
    </select></label>
  );
}
