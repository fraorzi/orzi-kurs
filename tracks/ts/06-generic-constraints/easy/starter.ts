// TODO
export function longest<T>(a: T, b: T): T {
  return a;
}

// TODO
export function getProp<T extends object, K>(obj: T, key: K): unknown {
  return undefined;
}

// TODO
export type ApiResponse<T> = { status: number; body: T };

export function ok<T>(body: T): ApiResponse<T> {
  // TODO
  throw new Error("TODO");
}

// TODO
export function noContent(): ApiResponse<null> {
  // TODO
  throw new Error("TODO");
}
