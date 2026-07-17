import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Respektuj drain", () => {
  it("spełnia kontrakt zadania", async () => {
    const { EventEmitter } = await import("node:events");
    class Sink extends EventEmitter {
      writes = 0;
      ended = false;
      write() {
        this.writes++;
        if (this.writes === 1) {
          queueMicrotask(() => this.emit("drain"));
          return false;
        }
        return true;
      }
      end() {
        this.ended = true;
      }
    }
    async function* chunks() {
      yield Buffer.from("a");
      yield Buffer.from("b");
    }
    const sink = new Sink();
    await solve(chunks(), sink);
    expect({ writes: sink.writes, ended: sink.ended }).toEqual({
      writes: 2,
      ended: true,
    });
  });
});
