export function defineRoutes<T extends Record<string, `/${string}`>>(
  routes: T,
): Readonly<T> {
  // TODO: dodaj const przed T i zwróć zamrożoną kopię
  return routes;
}

export function tuple<T extends readonly unknown[]>(...values: T): T {
  // TODO: const type parameter, zachowaj readonly tuple
  return values;
}
