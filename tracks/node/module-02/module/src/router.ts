import type { Route, RouteMatch } from "./types";

export function matchRoute(
  routes: readonly Route[],
  method: string,
  pathname: string,
): RouteMatch {
  throw new Error("TODO");
}
