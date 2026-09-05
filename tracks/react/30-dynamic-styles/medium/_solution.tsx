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
  return (
    <span
      className="status-badge"
      style={
        { "--badge-accent": accent } as StatusBadgeStyle
      }
    >
      {label}
    </span>
  );
}
