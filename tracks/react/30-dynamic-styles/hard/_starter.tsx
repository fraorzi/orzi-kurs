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
    <section className="metric-chart" aria-label={label}>
      {points.map((point) => (
        <div
          key={point.id}
          className="metric-chart__bar"
          role="meter"
          aria-label={point.label}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={point.value}
          style={{
            backgroundColor: accent,
            height: `${(point.value / max) * 100}%`,
          }}
        />
      ))}
    </section>
  );
}
