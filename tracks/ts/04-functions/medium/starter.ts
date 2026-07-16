// TODO: trzy przeciążenia range (stop) / (start, stop) / (start, stop, step)
export function range(start: number, stop?: number, step?: number): number[] {
  // TODO: implementacja; krok 0 → RangeError("krok nie może być zerem")
  return [];
}

// TODO: przeciążenia — string → boolean, number → string
export function parseSetting(value: string | number): boolean | string {
  // TODO
  return false;
}

// TODO: przyjmuje never i rzuca Error(`nieobsłużony wariant: ${JSON.stringify(value)}`)
export function assertNever(value: unknown): void {
  // TODO
}

export function describeSetting(value: string | number): string {
  // TODO: "przełącznik: true" / "wartość: 2"; na końcu bramka assertNever
  return "";
}
