export interface ThemeConfig {
  mode: "light" | "dark";
  radiusPx: number;
  fontFamily: string;
}

export const ROUTES = {
  home: "/",
  posts: "/posts",
  post: "/posts/:id",
  about: "/o-nas",
} as const satisfies Record<string, string>;

export type RouteName = keyof typeof ROUTES;

export function pathOf(name: RouteName): string {
  return ROUTES[name];
}

export const THEME = {
  mode: "dark",
  radiusPx: 8,
  fontFamily: "JetBrains Mono",
} as const satisfies ThemeConfig;

export function isDark(): boolean {
  return THEME.mode === "dark";
}
