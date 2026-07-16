export function range(stop: number): number[];
export function range(start: number, stop: number): number[];
export function range(start: number, stop: number, step: number): number[];
export function range(a: number, b?: number, step = 1): number[] {
  if (step === 0) throw new RangeError("krok nie może być zerem");

  const start = b === undefined ? 0 : a;
  const stop = b === undefined ? a : b;

  const values: number[] = [];
  if (step > 0) {
    for (let i = start; i < stop; i += step) values.push(i);
  } else {
    for (let i = start; i > stop; i += step) values.push(i);
  }
  return values;
}

export function parseSetting(value: string): boolean;
export function parseSetting(value: number): string;
export function parseSetting(value: string | number): boolean | string {
  if (typeof value === "number") return String(value);
  return value === "on";
}

export function assertNever(value: never): never {
  throw new Error(`nieobsłużony wariant: ${JSON.stringify(value)}`);
}

export function describeSetting(value: string | number): string {
  if (typeof value === "string") return `przełącznik: ${parseSetting(value)}`;
  if (typeof value === "number") return `wartość: ${parseSetting(value)}`;
  return assertNever(value);
}
