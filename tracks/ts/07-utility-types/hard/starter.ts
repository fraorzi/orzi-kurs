// TODO: mapa klucz pola → komunikat błędu, każdy klucz opcjonalny (Partial + Record).
export type FieldErrors<T> = unknown;

export interface FormState<T extends object> {
  // TODO: T z polami tylko do odczytu (Readonly)
  readonly values: T;
  // TODO: komplet kluczy T → boolean (Record), tylko do odczytu
  readonly touched: unknown;
  readonly errors: FieldErrors<T>;
}

export function createForm<T extends object>(initial: T): FormState<T> {
  // TODO: kopia wartości, wszystkie pola nietknięte, brak błędów
  throw new Error("TODO");
}

export function setField<T extends object, K extends keyof T>(
  state: FormState<T>,
  key: K,
  value: T[K],
): FormState<T> {
  // TODO: nowy stan; touched[key] = true; błąd tego pola znika
  throw new Error("TODO");
}

export function setErrors<T extends object>(
  state: FormState<T>,
  errors: FieldErrors<T>,
): FormState<T> {
  // TODO: nowy stan z podmienioną mapą błędów
  throw new Error("TODO");
}

export function isDirty<T extends object>(state: FormState<T>): boolean {
  // TODO: czy którekolwiek pole zostało dotknięte
  return false;
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Pick<T, K> {
  // TODO: nowy obiekt wyłącznie z podanymi kluczami
  throw new Error("TODO");
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Omit<T, K> {
  // TODO: kopia obiektu bez podanych kluczy
  throw new Error("TODO");
}
