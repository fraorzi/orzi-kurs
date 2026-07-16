export function routePathForFile(filePath: string): string | null {
  const segments = filePath.split("/");
  return `/${segments.slice(1, -1).join("/")}`;
}
