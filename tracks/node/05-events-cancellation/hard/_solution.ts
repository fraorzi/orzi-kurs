import { EventEmitter } from "node:events";
export function solve(
  report: (message: string) => void,
): import("node:events").EventEmitter {
  const emitter = new EventEmitter();
  emitter.on("error", (error: Error) => report(error.message));
  return emitter;
}
