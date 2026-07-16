export function greet(name: string, greeting?: string): string {
  // TODO: "Cześć, Ala!" / "Siema, Ala!"
  return "";
}

export function sum(): number {
  // TODO: dowolnie wiele liczb (parametr rest)
  return 0;
}

// TODO: typ callbacku (value, index) => number
export type Mapper = unknown;

export function mapNumbers(items: readonly number[], fn: Mapper): number[] {
  // TODO
  return [];
}

// TODO: typ zwracany ma być never
export function fail(message: string): void {
  // TODO: rzuć Error(message)
}
