import { once, type EventEmitter } from "node:events";

export async function solve(
  chunks: AsyncIterable<Uint8Array>,
  writable: EventEmitter & {
    write(chunk: Uint8Array): boolean;
    end(): void;
  },
): Promise<void> {
  for await (const chunk of chunks) {
    if (!writable.write(chunk)) await once(writable, "drain");
  }
  writable.end();
}
