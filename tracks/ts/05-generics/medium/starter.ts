// TODO
export class Stack {
  private readonly items: unknown[] = [];

  push(item: unknown): void {
    // TODO
  }

  pop(): unknown {
    // TODO
    return undefined;
  }

  peek(): unknown {
    // TODO
    return undefined;
  }

  // TODO
  get size(): number {
    return 0;
  }

  isEmpty(): boolean {
    // TODO
    return true;
  }

  toArray(): unknown[] {
    // TODO
    return [];
  }

  // TODO
  static from(items: readonly unknown[]): Stack {
    // TODO
    return new Stack();
  }
}

// TODO
export type Transform<T, U> = unknown;

// TODO
export function mapStack(stack: Stack, transform: Transform<unknown, unknown>): Stack {
  // TODO
  return stack;
}
