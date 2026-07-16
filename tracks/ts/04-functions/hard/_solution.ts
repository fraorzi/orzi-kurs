export type Fn = (value: number) => number;

export interface Memoized {
  (key: string): number;
  readonly hits: number;
  readonly misses: number;
  clear(): void;
}

export function once(fn: Fn): Fn {
  let called = false;
  let result = 0;
  return (value: number): number => {
    if (!called) {
      result = fn(value);
      called = true;
    }
    return result;
  };
}

export function compose(f: Fn, g: Fn): Fn {
  return (value: number): number => f(g(value));
}

export function memoize(fn: (key: string) => number): Memoized {
  const cache = new Map<string, number>();

  const memoized = (key: string): number => {
    const cached = cache.get(key);
    if (cached !== undefined) {
      memoized.hits += 1;
      return cached;
    }
    memoized.misses += 1;
    const value = fn(key);
    cache.set(key, value);
    return value;
  };

  memoized.hits = 0;
  memoized.misses = 0;
  memoized.clear = (): void => {
    cache.clear();
    memoized.hits = 0;
    memoized.misses = 0;
  };

  return memoized;
}
