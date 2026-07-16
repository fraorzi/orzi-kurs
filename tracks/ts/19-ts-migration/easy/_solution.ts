export type PathMappings = Readonly<
  Record<string, readonly string[]>
>;

function joinRelative(baseUrl: string, target: string): string {
  const segments = `${baseUrl}/${target}`.replaceAll("\\", "/").split("/");
  const resolved: string[] = [];
  for (const segment of segments) {
    if (segment === "" || segment === ".") continue;
    if (segment === "..") resolved.pop();
    else resolved.push(segment);
  }
  return `./${resolved.join("/")}`;
}

export function migratePathMappings(
  baseUrl: string,
  paths: PathMappings,
): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(paths).map(([alias, targets]) => [
      alias,
      targets.map((target) => joinRelative(baseUrl, target)),
    ]),
  );
}
