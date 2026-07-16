export class Stack<T> {
  private readonly items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items.at(-1);
  }

  get size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  toArray(): T[] {
    return [...this.items];
  }

  static from<U>(items: readonly U[]): Stack<U> {
    const stack = new Stack<U>();
    for (const item of items) {
      stack.push(item);
    }
    return stack;
  }
}

export type Transform<T, U> = (value: T) => U;

export function mapStack<T, U>(
  stack: Stack<T>,
  transform: Transform<T, U>,
): Stack<U> {
  return Stack.from(stack.toArray().map(transform));
}
