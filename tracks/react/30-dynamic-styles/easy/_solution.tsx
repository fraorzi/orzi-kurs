export function ProgressBar({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const normalizedValue = Math.min(Math.max(value, 0), max);

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={normalizedValue}
    >
      <div
        className="progress-bar__fill"
        style={{
          width: `${max > 0 ? (normalizedValue / max) * 100 : 0}%`,
        }}
      />
    </div>
  );
}
