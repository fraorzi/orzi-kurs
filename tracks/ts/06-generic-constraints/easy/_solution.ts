export function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

export function getProp<T extends object, K extends keyof T>(
  obj: T,
  key: K,
): T[K] {
  return obj[key];
}

export type ApiResponse<T = null> = { status: number; body: T };

export function ok<T>(body: T): ApiResponse<T> {
  return { status: 200, body };
}

export function noContent(): ApiResponse {
  return { status: 204, body: null };
}
