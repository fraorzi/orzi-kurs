import {
  useEffect,
  useState,
} from "react";

export interface ChartOptions {
  readonly currency: string;
  readonly series: readonly number[];
}

export function LiveChart({
  currency,
  series,
  connectChart,
}: {
  readonly currency: string;
  readonly series: readonly number[];
  readonly connectChart: (options: ChartOptions) => () => void;
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
      <p>{currency}: {series.join(", ")}</p>
    </section>
  );
}

