// TODO: typ zwracany funkcji (użyj infer).
export type MyReturnType<F> = F;

// TODO: krotka parametrów funkcji.
export type MyParameters<F> = F;

// TODO: rozpakuj Promise (także zagnieżdżone); nie-Promise zostaje sobą.
export type MyAwaited<T> = T;

// TODO: typ pierwszego parametru; brak parametrów → never.
export type FirstParam<F> = F;

export function once<F extends (...args: never[]) => unknown>(
  fn: F,
): (...args: MyParameters<F>) => MyReturnType<F> {
  // TODO: wywołaj fn najwyżej raz, potem oddawaj zapamiętany wynik
  throw new Error("TODO");
}

export async function resolveAll<T extends readonly unknown[]>(
  values: readonly [...T],
): Promise<{ [K in keyof T]: MyAwaited<T[K]> }> {
  // TODO: poczekaj na wszystkie wartości, zachowując kolejność
  throw new Error("TODO");
}
