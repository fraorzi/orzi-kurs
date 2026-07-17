export function solve(
  emitter: import("node:events").EventEmitter,
): (clientId: string, listener: (...args: unknown[]) => void) => () => void {
  return (_clientId, listener) => {
    emitter.on("update", listener);
    return () => undefined;
  };
}
