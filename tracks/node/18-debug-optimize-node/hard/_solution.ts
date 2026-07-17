export function solve(
  emitter: import("node:events").EventEmitter,
): (clientId: string, listener: (...args: unknown[]) => void) => () => void {
  const listeners = new Map<string, (...args: unknown[]) => void>();
  return (clientId, listener) => {
    const previous = listeners.get(clientId);
    if (previous) emitter.off("update", previous);
    listeners.set(clientId, listener);
    emitter.on("update", listener);
    let active = true;
    return () => {
      if (!active || listeners.get(clientId) !== listener) return;
      active = false;
      listeners.delete(clientId);
      emitter.off("update", listener);
    };
  };
}
