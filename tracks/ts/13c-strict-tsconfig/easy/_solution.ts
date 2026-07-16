export type User = {
  id: string;
  name: string;
};

export function findCached(
  cache: Readonly<Record<string, User>>,
  id: string,
): User | null {
  return cache[id] ?? null;
}

export function firstCached(
  cache: Readonly<Record<string, User>>,
  ids: readonly string[],
): User | null {
  for (const id of ids) {
    const user = cache[id];
    if (user !== undefined) return user;
  }
  return null;
}
