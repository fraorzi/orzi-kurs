export interface ThemeConfig {
  mode: "light" | "dark";
  radiusPx: number;
  fontFamily: string;
}

// TODO: as const satisfies Record<string, string> — kształt sprawdzony, literały zachowane
export const ROUTES: Record<string, string> = {
  home: "/",
  posts: "/posts",
  post: "/posts/:id",
  about: "/o-nas",
};

// TODO: unia kluczy ROUTES
export type RouteName = string;

export function pathOf(name: RouteName): string {
  // TODO
  return "";
}

// TODO: as const satisfies ThemeConfig
export const THEME = {
  mode: "dark",
  radiusPx: 8,
  fontFamily: "JetBrains Mono",
};

export function isDark(): boolean {
  // TODO
  return false;
}
