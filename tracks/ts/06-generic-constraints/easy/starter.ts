// TODO: ogranicz T do wartości mających length; zwróć dłuższą (remis → pierwsza).
export function longest<T>(a: T, b: T): T {
  return a;
}

// TODO: ogranicz K do kluczy T; typ wyniku to typ pola (T[K]).
export function getProp<T extends object, K>(obj: T, key: K): unknown {
  return undefined;
}

// TODO: parametr T z wartością domyślną null.
export type ApiResponse<T> = { status: number; body: T };

export function ok<T>(body: T): ApiResponse<T> {
  // TODO: status 200
  throw new Error("TODO");
}

// TODO: typ zwracany ma korzystać z domyślnego parametru (ApiResponse bez argumentu).
export function noContent(): ApiResponse<null> {
  // TODO: status 204, body null
  throw new Error("TODO");
}
