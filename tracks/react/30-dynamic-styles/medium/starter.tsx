export function StatusBadge({
  label,
  accent,
}: {
  readonly label: string;
  readonly accent: string;
}) {
  return <span className="status-badge">{label}</span>;
}
