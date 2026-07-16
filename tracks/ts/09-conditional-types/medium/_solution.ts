export type MyReturnType<F> = F extends (...args: never[]) => infer R ? R : never;

export type MyParameters<F> = F extends (...args: infer P) => unknown ? P : never;

export type MyAwaited<T> = T extends Promise<infer V> ? MyAwaited<V> : T;

export type FirstParam<F> = F extends (...args: infer P) => unknown
  ? P extends [infer First, ...unknown[]]
    ? First
    : never
  : never;

export function once<F extends (...args: never[]) => unknown>(
  fn: F,
): (...args: MyParameters<F>) => MyReturnType<F> {
  let called = false;
  let result: MyReturnType<F>;

  return (...args: MyParameters<F>): MyReturnType<F> => {
    if (!called) {
      const call = fn as unknown as (
        ...a: MyParameters<F>
      ) => MyReturnType<F>;
      result = call(...args);
      called = true;
    }
    return result;
  };
}

export async function resolveAll<T extends readonly unknown[]>(
  values: readonly [...T],
): Promise<{ [K in keyof T]: MyAwaited<T[K]> }> {
  const resolved = await Promise.all(values);
  return resolved as { [K in keyof T]: MyAwaited<T[K]> };
}
