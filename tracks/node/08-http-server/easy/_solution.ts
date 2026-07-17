export function solve(
  routes: readonly {
    method: string;
    path: string;
  }[],
  method: string,
  rawUrl: string,
): {
  status: 200 | 404 | 405;
  allow?: string[];
} {
  const path = new URL(rawUrl, "http://localhost").pathname;
  const samePath = routes.filter((route) => route.path === path);
  if (samePath.some((route) => route.method === method)) return { status: 200 };
  if (samePath.length)
    return {
      status: 405,
      allow: [...new Set(samePath.map((route) => route.method))].sort(),
    };
  return { status: 404 };
}
