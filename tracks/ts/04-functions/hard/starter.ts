export type Fn = (value: number) => number;

// TODO
export interface Memoized {
  hits: number;
}

export function once(fn: Fn): Fn {
  // TODO
  return fn;
}

export function compose(f: Fn, g: Fn): Fn {
  // TODO
  return f;
}

export function memoize(fn: (key: string) => number): Memoized {
  // TODO
  throw new Error("TODO");
}
