export type PathMappings = Readonly<
  Record<string, readonly string[]>
>;

export function migratePathMappings(
  baseUrl: string,
  paths: PathMappings,
): Record<string, string[]> {
  // TODO
  return Object.fromEntries(
    Object.keys(paths).map((alias) => [alias, []]),
  );
}
