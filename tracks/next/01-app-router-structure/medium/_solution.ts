export function routePathForFile(filePath: string): string | null {
  const segments = filePath.replaceAll("\\", "/").split("/").filter(Boolean);
  const appIndex = segments.indexOf("app");
  const fileName = segments.at(-1);

  if (
    appIndex === -1 ||
    !fileName ||
    !/^(?:page\.tsx|route\.ts)$/.test(fileName)
  ) {
    return null;
  }

  const routeSegments = segments.slice(appIndex + 1, -1);
  if (routeSegments.some((segment) => segment.startsWith("_"))) return null;

  const visibleSegments = routeSegments.filter((segment) =>
    !/^\(.+\)$/.test(segment) && !segment.startsWith("@")
  );
  return visibleSegments.length === 0 ? "/" : `/${visibleSegments.join("/")}`;
}
