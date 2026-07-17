export function solve(
  emitter: import("node:events").EventEmitter,
  event: string,
  listener: (...args: unknown[]) => void,
): () => void {
  emitter.on(event, listener);
  let active = true;
  return () => {
    if (!active) return;
    active = false;
    emitter.off(event, listener);
  };
}
