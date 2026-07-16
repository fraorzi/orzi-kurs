export type User = { id: number; name: string; email: string | null };

// TODO: unia rozłączna — sukces z użytkownikiem albo porażka z listą błędów.
export type ParseResult = {
  ok: boolean;
  user?: User;
  errors?: string[];
};

// TODO: strażnik typu — musi zwracać predykat `value is Record<string, unknown>`.
export function isRecord(value: unknown): boolean {
  return false;
}

export function parseUser(input: unknown): ParseResult {
  // TODO: walidacja bez `as` i bez `any` — zawężanie przez typeof / isRecord
  return { ok: false, errors: [] };
}

export function userLabel(result: ParseResult): string {
  // TODO: "Ala (#1)" albo "błędy: a, b"
  return "";
}
