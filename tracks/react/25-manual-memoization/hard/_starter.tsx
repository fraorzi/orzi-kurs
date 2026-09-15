import { useEffect, useState } from "react";

export interface ChartOptions {
  currency: string;
  series: number[];
}

export function LiveChart({
  currency,
  series,
  connectChart,
}: {
  currency: string;
  series: number[];
  connectChart: (options: ChartOptions) => () => void;
}) {
  const [title, setTitle] = useState("");
  const options = { currency, series };

  useEffect(
    () => connectChart(options),
    [connectChart, options],
  );

  return (
    <section aria-label="Wykres na żywo">
      <label>
        Tytuł widoku
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <p>
        {currency}: {series.join(", ")}
      </p>
    </section>
  );
}
