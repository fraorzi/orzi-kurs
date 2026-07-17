export function solve(input: unknown): {
  type: "email" | "report";
  text: string;
  cost: number;
} {
  if (!input || typeof input !== "object")
    throw new Error("Nieprawidłowy rekord");
  const value = input as Record<string, unknown>;
  if (value.type !== "email" && value.type !== "report")
    throw new Error("Nieznany typ");
  if (typeof value.text !== "string" || Buffer.byteLength(value.text) > 1024)
    throw new Error("Tekst za duży");
  if (
    typeof value.cost !== "number" ||
    !Number.isFinite(value.cost) ||
    value.cost < 0 ||
    value.cost > 1000
  )
    throw new Error("Błędny koszt");
  return { type: value.type, text: value.text, cost: value.cost };
}
