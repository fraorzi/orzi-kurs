export type ParamKeys<P extends string> =
  P extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ParamKeys<Rest>
    : P extends `${string}:${infer Param}`
      ? Param
      : never;

export type PathParams<P extends string> = Record<ParamKeys<P>, string>;

function segments(path: string): string[] {
  return path.split("/").filter((segment) => segment.length > 0);
}

export function buildPath<P extends string>(
  pattern: P,
  params: PathParams<P>,
): string {
  const values: Record<string, string> = params;
  const out = segments(pattern).map((segment) => {
    if (!segment.startsWith(":")) return segment;

    const name = segment.slice(1);
    const value = values[name];
    if (value === undefined) {
      throw new Error(`brak parametru: ${name}`);
    }
    return encodeURIComponent(value);
  });
  return `/${out.join("/")}`;
}

export function matchPath<P extends string>(
  pattern: P,
  path: string,
): PathParams<P> | null {
  const patternParts = segments(pattern);
  const pathParts = segments(path);
  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};
  for (const [index, expected] of patternParts.entries()) {
    const actual = pathParts[index];
    if (expected.startsWith(":")) {
      params[expected.slice(1)] = decodeURIComponent(actual);
      continue;
    }
    if (expected !== actual) return null;
  }
  return params as PathParams<P>;
}
