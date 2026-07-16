export type AwaitedTuple<Values extends readonly unknown[]> = {
  -readonly [K in keyof Values]: Awaited<Values[K]>;
};

export async function resolveTuple<
  const Values extends readonly unknown[],
>(values: Values): Promise<AwaitedTuple<Values>> {
  return Promise.all(values) as Promise<AwaitedTuple<Values>>;
}
