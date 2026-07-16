export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type Optional<T, K extends keyof T> = Prettify<
  Omit<T, K> & Partial<Pick<T, K>>
>;

export type RequiredOnly<T, K extends keyof T> = Prettify<
  Pick<T, K> & Partial<Omit<T, K>>
>;

export function applyDefaults<T extends object, K extends keyof T>(
  input: Optional<T, K>,
  defaults: Pick<T, K>,
): T {
  const merged: Record<string, unknown> = { ...defaults };
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) {
      merged[key] = value;
    }
  }
  return merged as T;
}
