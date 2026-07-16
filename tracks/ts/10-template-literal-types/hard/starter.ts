// TODO: unia nazw parametrów wzorca ("/users/:id/posts/:postId" → "id" | "postId").
export type ParamKeys<P extends string> = string;

// TODO: obiekt parametrów wzorca ("/users/:id" → { id: string }).
export type PathParams<P extends string> = Record<string, string>;

export function buildPath<P extends string>(
  pattern: P,
  params: PathParams<P>,
): string {
  // TODO: podstaw wartości (encodeURIComponent) w miejsce segmentów :nazwa
  throw new Error("TODO");
}

export function matchPath<P extends string>(
  pattern: P,
  path: string,
): PathParams<P> | null {
  // TODO: dopasuj ścieżkę do wzorca; parametry zdekoduj (decodeURIComponent)
  throw new Error("TODO");
}
