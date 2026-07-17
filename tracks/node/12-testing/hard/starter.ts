export async function solve<T>(
  server: import("node:http").Server,
  run: (origin: string) => Promise<T>,
): Promise<T> {
  throw new Error("TODO");
}
