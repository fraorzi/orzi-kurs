// TODO
export type FieldErrors<T> = unknown;

export interface FormState<T extends object> {
  // TODO
  readonly values: T;
  // TODO
  readonly touched: unknown;
  readonly errors: FieldErrors<T>;
}

export function createForm<T extends object>(initial: T): FormState<T> {
  // TODO
  throw new Error("TODO");
}

export function setField<T extends object, K extends keyof T>(
  state: FormState<T>,
  key: K,
  value: T[K],
): FormState<T> {
  // TODO
  throw new Error("TODO");
}

export function setErrors<T extends object>(
  state: FormState<T>,
  errors: FieldErrors<T>,
): FormState<T> {
  // TODO
  throw new Error("TODO");
}

export function isDirty<T extends object>(state: FormState<T>): boolean {
  // TODO
  return false;
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Pick<T, K> {
  // TODO
  throw new Error("TODO");
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Omit<T, K> {
  // TODO
  throw new Error("TODO");
}
