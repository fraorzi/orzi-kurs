export type RouteDirection = -1 | 0 | 1;

export const ROUTE_EASE = [0.22, 1, 0.36, 1] as const;
export const SHARED_LAYOUT_TRANSITION = {
  duration: 0.26,
  ease: ROUTE_EASE,
  type: "tween",
} as const;

export function topicNumberLayoutId(track: string, topicSlug: string): string {
  return `topic-number-${track}-${topicSlug}`;
}

export function topicTitleLayoutId(track: string, topicSlug: string): string {
  return `topic-title-${track}-${topicSlug}`;
}

function learningRouteChain(pathname: string): string[] | null {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return ["home"];
  if (segments[0] !== "track" || segments.length < 2 || segments.length > 4) {
    return null;
  }

  return [
    "home",
    `track:${segments[1]}`,
    ...(segments[2] ? [`topic:${segments[2]}`] : []),
    ...(segments[3] ? [`task:${segments[3]}`] : []),
  ];
}

function isAncestorRoute(ancestor: string[], descendant: string[]): boolean {
  return ancestor.length < descendant.length
    && ancestor.every((segment, index) => segment === descendant[index]);
}

export function routeDirection(previousPathname: string, pathname: string): RouteDirection {
  const previousRoute = learningRouteChain(previousPathname);
  const nextRoute = learningRouteChain(pathname);
  if (!previousRoute || !nextRoute) return 0;

  if (isAncestorRoute(previousRoute, nextRoute)) return 1;
  if (isAncestorRoute(nextRoute, previousRoute)) return -1;
  return 0;
}
