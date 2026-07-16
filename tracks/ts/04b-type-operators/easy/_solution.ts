export const ROUTES = {
  home: "/",
  account: "/account",
  order: "/orders/:id",
} as const;

export type RouteName = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteName];

export function pathFor(name: RouteName): RoutePath {
  return ROUTES[name];
}

export function isRouteName(value: string): value is RouteName {
  return Object.hasOwn(ROUTES, value);
}
