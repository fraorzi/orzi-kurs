export const ROUTES = {
  home: "/",
  account: "/account",
  order: "/orders/:id",
} as const;

// TODO: keyof typeof ROUTES
export type RouteName = string;

// TODO: (typeof ROUTES)[RouteName]
export type RoutePath = string;

export function pathFor(name: RouteName): RoutePath {
  // TODO
  return "";
}

export function isRouteName(value: string): value is RouteName {
  // TODO: sprawdź własny klucz obiektu
  return false;
}
