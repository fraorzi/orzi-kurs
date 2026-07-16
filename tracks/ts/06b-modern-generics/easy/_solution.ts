export function defineRoutes<
  const T extends Record<string, `/${string}`>,
>(routes: T): Readonly<T> {
  return Object.freeze({ ...routes });
}

export function tuple<const T extends readonly unknown[]>(...values: T): T {
  return values;
}
