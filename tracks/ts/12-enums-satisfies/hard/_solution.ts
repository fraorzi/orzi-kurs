export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface Column {
  readonly key: keyof User;
  readonly label: string;
  readonly align?: "left" | "right";
}

export const COLUMNS = [
  { key: "name", label: "Nazwa" },
  { key: "email", label: "E-mail" },
  { key: "createdAt", label: "Utworzono", align: "right" },
] as const satisfies readonly Column[];

export type ColumnKey = (typeof COLUMNS)[number]["key"];

export function headers(): string[] {
  return COLUMNS.map((column) => column.label);
}

export function row(user: User): string[] {
  return COLUMNS.map((column) => String(user[column.key]));
}

export function isColumnKey(key: string): key is ColumnKey {
  return COLUMNS.some((column) => column.key === key);
}

export type State = "idle" | "loading" | "done" | "error";

export const TRANSITIONS = {
  idle: ["loading"],
  loading: ["done", "error"],
  done: ["idle"],
  error: ["idle", "loading"],
} as const satisfies Record<State, readonly State[]>;

export function canTransition(from: State, to: State): boolean {
  return nextStates(from).includes(to);
}

export function nextStates(state: State): readonly State[] {
  return TRANSITIONS[state];
}

export function transition(from: State, to: State): State {
  if (!canTransition(from, to)) {
    throw new Error(`niedozwolone przejście: ${from} → ${to}`);
  }
  return to;
}
