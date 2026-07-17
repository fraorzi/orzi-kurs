export function solve(
  attempt: number,
  baseMs: number,
  capMs: number,
  random: () => number,
): number {
  if (!Number.isInteger(attempt) || attempt < 0 || baseMs < 1 || capMs < baseMs)
    throw new Error("Błędna konfiguracja backoffu");
  const ceiling = Math.min(capMs, baseMs * 2 ** attempt);
  const value = random();
  if (value < 0 || value >= 1) throw new Error("RNG poza zakresem");
  return Math.floor(value * ceiling);
}
