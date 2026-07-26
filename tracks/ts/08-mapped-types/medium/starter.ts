// TODO
export type Prettify<T> = T;

// TODO
export type Optional<T, K extends keyof T> = T;

// TODO
export type RequiredOnly<T, K extends keyof T> = T;

export function applyDefaults<T extends object, K extends keyof T>(
  input: Optional<T, K>,
  defaults: Pick<T, K>,
): T {
  // TODO
  throw new Error("TODO");
}
