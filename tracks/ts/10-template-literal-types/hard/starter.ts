// TODO
export type ParamKeys<P extends string> = string;

// TODO
export type PathParams<P extends string> = Record<string, string>;

export function buildPath<P extends string>(
  pattern: P,
  params: PathParams<P>,
): string {
  // TODO
  throw new Error("TODO");
}

export function matchPath<P extends string>(
  pattern: P,
  path: string,
): PathParams<P> | null {
  // TODO
  throw new Error("TODO");
}
