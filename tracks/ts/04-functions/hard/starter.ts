export type Fn = (value: number) => number;

// TODO: obiekt wywoływalny — sygnatura wywołania + hits/misses/clear
export interface Memoized {
  hits: number;
}

export function once(fn: Fn): Fn {
  // TODO: fn wołane najwyżej raz; kolejne wywołania zwracają zapamiętany wynik
  return fn;
}

export function compose(f: Fn, g: Fn): Fn {
  // TODO: compose(f, g)(x) === f(g(x))
  return f;
}

export function memoize(fn: (key: string) => number): Memoized {
  // TODO: cache w Map + liczniki hits/misses + clear()
  throw new Error("TODO");
}
