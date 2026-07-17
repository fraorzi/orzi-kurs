import { EventEmitter } from "node:events";
import { setImmediate as tick } from "node:timers/promises";
import { describe, expect, it } from "vitest";
import { solve } from "./starter";

class Sink extends EventEmitter {
  readonly timeline: string[] = [];
  ended = false;

  constructor(private readonly refuseWrites: number) {
    super();
  }

  write(chunk: Uint8Array): boolean {
    this.timeline.push(`write:${Buffer.from(chunk).toString()}`);
    if (this.refuseWrites > 0 && this.timeline.filter((e) => e.startsWith("write")).length <= this.refuseWrites) {
      void tick().then(() => {
        this.timeline.push("drain");
        this.emit("drain");
      });
      return false;
    }
    return true;
  }

  end(): void {
    this.ended = true;
    this.timeline.push("end");
  }
}

async function* chunks(parts: readonly string[]): AsyncGenerator<Uint8Array> {
  for (const part of parts) yield Buffer.from(part);
}

describe("pompowanie z poszanowaniem drain", () => {
  it("zapisuje wszystkie chunki i kończy end()", async () => {
    const sink = new Sink(0);
    await solve(chunks(["a", "b", "c"]), sink);
    expect(sink.timeline).toEqual(["write:a", "write:b", "write:c", "end"]);
    expect(sink.ended).toBe(true);
  });

  it("po write=false kolejny zapis następuje dopiero po drain", async () => {
    const sink = new Sink(1);
    await solve(chunks(["a", "b"]), sink);
    expect(sink.timeline).toEqual(["write:a", "drain", "write:b", "end"]);
  });

  it("każde odrzucenie wstrzymuje pompę osobno", async () => {
    const sink = new Sink(2);
    await solve(chunks(["a", "b", "c"]), sink);
    expect(sink.timeline).toEqual([
      "write:a",
      "drain",
      "write:b",
      "drain",
      "write:c",
      "end",
    ]);
  });

  it("end nie jest wywoływane przed ostatnim drainem", async () => {
    const sink = new Sink(1);
    await solve(chunks(["jedyny"]), sink);
    expect(sink.timeline).toEqual(["write:jedyny", "drain", "end"]);
  });
});
