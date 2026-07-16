export type User = { id: number; name: string; email: string | null };

export type ParseResult =
  | { ok: true; user: User }
  | { ok: false; errors: string[] };

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isEmailValue(value: unknown): value is string | null | undefined {
  return typeof value === "string" || value === null || value === undefined;
}

export function parseUser(input: unknown): ParseResult {
  if (!isRecord(input)) {
    return { ok: false, errors: ["dane nie są obiektem"] };
  }

  const { id, name, email } = input;

  if (isInteger(id) && isNonEmptyString(name) && isEmailValue(email)) {
    return { ok: true, user: { id, name, email: email ?? null } };
  }

  const errors: string[] = [];
  if (!isInteger(id)) errors.push("id musi być liczbą całkowitą");
  if (!isNonEmptyString(name)) errors.push("name musi być niepustym tekstem");
  if (!isEmailValue(email)) errors.push("email musi być tekstem albo null");
  return { ok: false, errors };
}

export function userLabel(result: ParseResult): string {
  if (result.ok) {
    return `${result.user.name} (#${result.user.id})`;
  }
  return `błędy: ${result.errors.join(", ")}`;
}
