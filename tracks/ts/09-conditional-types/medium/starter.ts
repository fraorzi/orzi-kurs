// TODO
export type MyReturnType<F> = F;

// TODO
export type MyParameters<F> = F;

// TODO
export type MyAwaited<T> = T;

// TODO
export type FirstParam<F> = F;

export function once<F extends (...args: never[]) => unknown>(
  fn: F,
): (...args: MyParameters<F>) => MyReturnType<F> {
  // TODO
  throw new Error("TODO");
}

export async function resolveAll<T extends readonly unknown[]>(
  values: readonly [...T],
): Promise<{ [K in keyof T]: MyAwaited<T[K]> }> {
  // TODO
  throw new Error("TODO");
}
