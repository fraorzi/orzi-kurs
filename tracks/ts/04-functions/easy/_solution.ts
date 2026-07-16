export function greet(name: string, greeting = "Cześć"): string {
  return `${greeting}, ${name}!`;
}

export function sum(...numbers: number[]): number {
  return numbers.reduce((total, value) => total + value, 0);
}

export type Mapper = (value: number, index: number) => number;

export function mapNumbers(items: readonly number[], fn: Mapper): number[] {
  return items.map((value, index) => fn(value, index));
}

export function fail(message: string): never {
  throw new Error(message);
}
