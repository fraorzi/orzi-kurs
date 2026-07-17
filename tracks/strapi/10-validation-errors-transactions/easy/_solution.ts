export function solve(input: unknown): { title: string; locale: string } {
  if (typeof input !== "object" || input === null) throw new Error("Nieprawidłowe: body");
  const value = input as Record<string, unknown>;
  if (typeof value.title !== "string" || value.title.trim().length < 3) throw new Error("Nieprawidłowe: title");
  if (typeof value.locale !== "string" || !/^[a-z]{2}$/.test(value.locale)) throw new Error("Nieprawidłowe: locale");
  return { title: value.title.trim(), locale: value.locale };
}

