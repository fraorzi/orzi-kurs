import type { CSSProperties } from "react";

type ChartStyle = CSSProperties & {
  "--chart-accent": string;
};

type BarStyle = CSSProperties & {
  "--bar-ratio": string;
};

function barStyle(ratio: number): BarStyle {
  return { "--bar-ratio": String(ratio) };
}

export interface MetricPoint {
  id: string;
  label: string;
  value: number;
}

export function MetricChart({
  label,
  accent,
  points,
}: {
  label: string;
  accent: string;
  points: MetricPoint[];
}) {
  let max = 1;
  for (const point of points) {
    max = Math.max(max, point.value);
  }
  const chartStyle: ChartStyle = {
    "--chart-accent": accent,
  };

  return (
    <section
      className="metric-chart"
      aria-label={label}
      style={chartStyle}
    >
      {points.map((point) => (
        <div
          key={point.id}
          className="metric-chart__bar"
          role="meter"
          aria-label={point.label}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={point.value}
          style={barStyle(point.value / max)}
        />
      ))}
    </section>
  );
}
