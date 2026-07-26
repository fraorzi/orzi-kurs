export const ROUTES = {
  home: "/",
  account: "/account",
  order: "/orders/:id",
} as const;

// TODO
export type RouteName = string;

// TODO
export type RoutePath = string;

export function pathFor(name: RouteName): RoutePath {
  // TODO
  return "";
}

export function isRouteName(value: string): value is RouteName {
  // TODO
  return false;
}
