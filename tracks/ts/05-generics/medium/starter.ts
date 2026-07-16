// TODO: klasa generyczna — parametr typu T przy nazwie klasy
export class Stack {
  private readonly items: unknown[] = [];

  push(item: unknown): void {
    // TODO: połóż na wierzch
  }

  pop(): unknown {
    // TODO: zdejmij z wierzchu; pusty stos → undefined
    return undefined;
  }

  peek(): unknown {
    // TODO: podejrzyj wierzch bez zdejmowania
    return undefined;
  }

  // TODO: getter zwracający liczbę elementów
  get size(): number {
    return 0;
  }

  isEmpty(): boolean {
    // TODO
    return true;
  }

  toArray(): unknown[] {
    // TODO: KOPIA elementów, od dna do wierzchu
    return [];
  }

  // TODO: metoda statyczna z WŁASNYM parametrem typu (nie widzi T z klasy)
  static from(items: readonly unknown[]): Stack {
    // TODO
    return new Stack();
  }
}

// TODO: alias na funkcję transformującą (value: T) => U
export type Transform<T, U> = unknown;

// TODO: dwa parametry typu; nowy stos, kolejność zachowana, źródło nietknięte
export function mapStack(stack: Stack, transform: Transform<unknown, unknown>): Stack {
  // TODO
  return stack;
}
