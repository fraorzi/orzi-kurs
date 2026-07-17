import type { EventEmitter } from "node:events";

export async function solve(
  chunks: AsyncIterable<Uint8Array>,
  writable: EventEmitter & {
    write(chunk: Uint8Array): boolean;
    end(): void;
  },
): Promise<void> {
  throw new Error("TODO");
}
