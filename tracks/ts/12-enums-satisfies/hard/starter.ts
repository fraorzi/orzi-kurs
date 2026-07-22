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

// TODO
export const COLUMNS: readonly Column[] = [
  { key: "name", label: "Nazwa" },
  { key: "email", label: "E-mail" },
  { key: "createdAt", label: "Utworzono", align: "right" },
];

// TODO
export type ColumnKey = string;

export function headers(): string[] {
  // TODO
  return [];
}

export function row(user: User): string[] {
  // TODO
  return [];
}

// TODO
export function isColumnKey(key: string): boolean {
  return false;
}

export type State = "idle" | "loading" | "done" | "error";

// TODO
export const TRANSITIONS = {
  idle: ["loading"],
  loading: ["done", "error"],
  done: ["idle"],
  error: ["idle", "loading"],
};

export function canTransition(from: State, to: State): boolean {
  // TODO
  return false;
}

export function nextStates(state: State): readonly State[] {
  // TODO
  return [];
}

export function transition(from: State, to: State): State {
  // TODO
  return from;
}
