export function solve(
  emitter: import("node:events").EventEmitter,
  event: string,
  listener: (...args: unknown[]) => void,
): () => void {
  throw new Error("TODO");
}
