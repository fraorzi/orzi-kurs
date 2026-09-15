import type { CSSProperties } from "react";

type StatusBadgeStyle = CSSProperties & {
  "--badge-accent": string;
};

export function StatusBadge({
  label,
  accent,
}: {
  label: string;
  accent: string;
}) {
  const style: StatusBadgeStyle = {
    "--badge-accent": accent,
  };

  return (
    <span
      className="status-badge"
      style={style}
    >
      {label}
    </span>
  );
}
