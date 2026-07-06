import type { TaskStatus } from "@/app/lib/types";

const LABEL: Record<TaskStatus, string> = {
  passed: "ZALICZONE",
  failed: "OBLANE",
  "not-started": "NIETKNIĘTE",
};

const CLASS: Record<TaskStatus, string> = {
  passed: "text-pass border-pass-border bg-pass-bg",
  failed: "text-fail border-fail-border bg-fail-bg",
  "not-started": "text-pending border-pending-border bg-pending-bg",
};

export function statusGlyph(status: TaskStatus): string {
  if (status === "passed") return "[x]";
  if (status === "failed") return "[!]";
  return "[ ]";
}

export default function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={`inline-block border px-2 py-0.5 text-[11px] font-bold tracking-wider ${CLASS[status]}`}
    >
      {LABEL[status]}
    </span>
  );
}
