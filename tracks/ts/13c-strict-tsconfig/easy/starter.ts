export type User = {
  id: string;
  name: string;
};

export function findCached(
  cache: Readonly<Record<string, User>>,
  id: string,
): User | null {
  // TODO: indeks może zwrócić undefined
  return cache[id];
}

export function firstCached(
  cache: Readonly<Record<string, User>>,
  ids: readonly string[],
): User | null {
  // TODO: zwróć pierwsze trafienie, bez !
  return cache[ids[0]].id ? cache[ids[0]] : null;
}
