import type { ReactNode } from "react";
export interface Column<T> { label: string; render(row: T): ReactNode }
export function DataTable<T>({ rows, columns, keyOf }: { rows: readonly T[]; columns: readonly Column<T>[]; keyOf(row: T): string }): ReactNode {
  if (rows.length === 0) return <p role="status">Brak danych</p>;
  return <table><thead><tr>{columns.map((column) => <th scope="col" key={column.label}>{column.label}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={keyOf(row)}>{columns.map((column) => <td key={column.label}>{column.render(row)}</td>)}</tr>)}</tbody></table>;
}

