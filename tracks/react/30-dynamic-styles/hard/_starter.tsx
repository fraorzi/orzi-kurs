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
