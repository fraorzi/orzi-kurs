export interface Animal {
  name: string;
}

export interface Dog extends Animal {
  bark(): string;
}

// TODO: jawne adnotacje wariancji zgodne ze strukturą.
export type Producer<T> = () => T;
export type Consumer<T> = (value: T) => void;

export function transfer<T>(
  producer: Producer<T>,
  consumer: Consumer<T>,
): void {
  // TODO
}
