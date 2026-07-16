import type { CSSProperties } from "react";

type StatusBadgeStyle = CSSProperties & {
  "--badge-accent": string;
};

export function StatusBadge({
  label,
  accent,
}: {
  readonly label: string;
  readonly accent: string;
}) {
  return (
    <span
      className="status-badge"
      style={{ "--badge-accent": accent } as StatusBadgeStyle}
    >
      {label}
    </span>
  );
}
