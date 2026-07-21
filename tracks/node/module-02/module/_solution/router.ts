import type { Route, RouteMatch } from "./types";

export function matchRoute(
  routes: readonly Route[],
  method: string,
  pathname: string,
): RouteMatch {
  const samePath = routes.filter((route) => route.path === pathname);
  const route = samePath.find((candidate) => candidate.method === method);
  if (route) return { kind: "match", route };
  if (samePath.length > 0) {
    return {
      kind: "method-mismatch",
      allow: [...new Set(samePath.map((candidate) => candidate.method))].sort(),
    };
  }
  return { kind: "not-found" };
}
