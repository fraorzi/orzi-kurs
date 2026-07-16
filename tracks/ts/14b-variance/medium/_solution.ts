export type Animal =
  | { kind: "dog"; name: string; bark(): string }
  | { kind: "cat"; name: string; meow(): string };

export interface Handler<T> {
  handle: (value: T) => void;
}

export function notifyAll(
  animals: readonly Animal[],
  handler: Handler<Animal>,
): void {
  for (const animal of animals) handler.handle(animal);
}
