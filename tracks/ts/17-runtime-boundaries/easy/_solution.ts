declare const brand: unique symbol;

export type UserId = string & { readonly [brand]: "UserId" };

export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; message: string };

export function parseUserId(value: unknown): ParseResult<UserId> {
  if (typeof value !== "string") {
    return { ok: false, message: "invalid user id" };
  }
  const match = /^usr_([1-9]\d*)$/.exec(value);
  if (match === null) return { ok: false, message: "invalid user id" };
  return { ok: true, value: value as UserId };
}

export function userPath(id: UserId): string {
  return `/users/${id}`;
}
