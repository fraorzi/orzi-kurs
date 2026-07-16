export type Animal =
  | { kind: "dog"; name: string; bark(): string }
  | { kind: "cat"; name: string; meow(): string };

// TODO: metoda jest bivariant — zamień ją na właściwość funkcyjną.
export interface Handler<T> {
  handle(value: T): void;
}

export function notifyAll(
  animals: readonly Animal[],
  handler: Handler<Animal>,
): void {
  // TODO
}
