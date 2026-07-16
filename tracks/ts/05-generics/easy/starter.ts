// TODO: dodaj parametr typu — funkcja ma zwracać dokładnie ten typ, który dostała
export function identity(value: unknown): unknown {
  // TODO: zwróć value bez zmian
  return null;
}

// TODO: parametr typu; wynik to T | null
export function firstOrNull(items: readonly unknown[]): unknown {
  // TODO: pierwszy element albo null dla pustej listy
  return null;
}

// TODO: generyczny alias — pudełko na wartość typu T
export type Box<T> = { value: unknown };

export function box(value: unknown): Box<unknown> {
  // TODO: opakuj wartość
  return { value: null };
}

export function unbox(boxed: Box<unknown>): unknown {
  // TODO: wyjmij wartość z pudełka
  return null;
}

// TODO: dwa parametry typu (A, B) i krotka [A, B] jako wynik
export function pair(first: unknown, second: unknown): unknown[] {
  // TODO
  return [];
}
