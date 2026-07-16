export interface Animal {
  name: string;
}

export interface Dog extends Animal {
  bark(): string;
}

export type Producer<out T> = () => T;
export type Consumer<in T> = (value: T) => void;

export function transfer<T>(
  producer: Producer<T>,
  consumer: Consumer<T>,
): void {
  consumer(producer());
}
