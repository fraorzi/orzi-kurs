import { once } from "node:events";

export async function solve<T>(
  emitter: import("node:events").EventEmitter,
  event: string,
  signal: AbortSignal,
): Promise<T> {
  const [value] = await once(emitter, event, { signal });
  return value as T;
}
