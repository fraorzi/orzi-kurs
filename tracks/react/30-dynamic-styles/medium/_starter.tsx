export function StatusBadge({
  label,
  accent,
}: {
  label: string;
  accent: string;
}) {
  return <span className="status-badge">{label}</span>;
}
