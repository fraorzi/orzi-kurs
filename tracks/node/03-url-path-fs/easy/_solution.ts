export function solve(moduleUrl: string, relativeFile: string): string {
  return new URL(relativeFile, moduleUrl).pathname;
}
