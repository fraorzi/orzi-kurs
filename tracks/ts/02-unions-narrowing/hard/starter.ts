export type User = { id: number; name: string; email: string | null };

// TODO
export type ParseResult = {
  ok: boolean;
  user?: User;
  errors?: string[];
};

// TODO
export function isRecord(value: unknown): boolean {
  return false;
}

export function parseUser(input: unknown): ParseResult {
  // TODO
  return { ok: false, errors: [] };
}

export function userLabel(result: ParseResult): string {
  // TODO
  return "";
}
