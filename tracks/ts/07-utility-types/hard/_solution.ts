export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export interface FormState<T extends object> {
  readonly values: Readonly<T>;
  readonly touched: Readonly<Record<keyof T, boolean>>;
  readonly errors: FieldErrors<T>;
}

function keysOf<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function createForm<T extends object>(initial: T): FormState<T> {
  const touched = {} as Record<keyof T, boolean>;
  for (const key of keysOf(initial)) {
    touched[key] = false;
  }
  return { values: { ...initial }, touched, errors: {} };
}

export function setField<T extends object, K extends keyof T>(
  state: FormState<T>,
  key: K,
  value: T[K],
): FormState<T> {
  const values: T = { ...state.values };
  values[key] = value;

  const touched: Record<keyof T, boolean> = { ...state.touched };
  touched[key] = true;

  const errors: FieldErrors<T> = { ...state.errors };
  delete errors[key];

  return { values, touched, errors };
}

export function setErrors<T extends object>(
  state: FormState<T>,
  errors: FieldErrors<T>,
): FormState<T> {
  return { values: state.values, touched: state.touched, errors: { ...errors } };
}

export function isDirty<T extends object>(state: FormState<T>): boolean {
  return keysOf(state.touched).some((key) => state.touched[key]);
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Pick<T, K> {
  const out = {} as Pick<T, K>;
  for (const key of keys) {
    out[key] = obj[key];
  }
  return out;
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Omit<T, K> {
  const out: Partial<T> = { ...obj };
  for (const key of keys) {
    delete out[key];
  }
  return out as Omit<T, K>;
}
