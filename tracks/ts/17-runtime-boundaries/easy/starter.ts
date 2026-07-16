declare const brand: unique symbol;

// TODO: string z readonly brandem "UserId".
export type UserId = string;

export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };

export function parseUserId(value: unknown): ParseResult<UserId> {
  // TODO: usr_ + dodatnia liczba całkowita
  return { ok: false, message: "invalid user id" };
}

export function userPath(id: UserId): string {
  return `/users/${id}`;
}
