import type { ReactNode } from "react";
export interface Column<T> { label: string; render(row: T): ReactNode }
export function DataTable<T>(_props: { rows: readonly T[]; columns: readonly Column<T>[]; keyOf(row: T): string }): ReactNode {
  return null;
}
