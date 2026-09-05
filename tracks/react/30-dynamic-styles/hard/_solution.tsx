import type { CSSProperties } from "react";

type ChartStyle = CSSProperties & {
  "--chart-accent": string;
};

type BarStyle = CSSProperties & {
  "--bar-ratio": string;
};

export interface MetricPoint {
  readonly id: string;
  readonly label: string;
  readonly value: number;
}

export function MetricChart({
  label,
  accent,
  points,
}: {
  label: string;
  accent: string;
  points: readonly MetricPoint[];
}) {
  const max = Math.max(
    ...points.map((point) => point.value),
    1,
  );

  return (
    <section
      className="metric-chart"
      aria-label={label}
      style={{ "--chart-accent": accent } as ChartStyle}
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
          style={
            {
              "--bar-ratio": String(point.value / max),
            } as BarStyle
          }
        />
      ))}
    </section>
  );
}
