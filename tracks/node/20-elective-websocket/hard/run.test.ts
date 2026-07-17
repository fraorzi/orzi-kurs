import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

describe("Zbuduj ograniczoną kolejkę wysyłki", () => {
  it("spełnia kontrakt elective", async () => {
    const queue = solve(5);
    queue.enqueue("ab");
    queue.enqueue("c");
    expect(queue.queuedBytes()).toBe(3);
    const sent: string[] = [];
    queue.flush((data) => sent.push(data));
    expect(sent).toEqual(["ab", "c"]);
    expect(queue.queuedBytes()).toBe(0);
    queue.enqueue("12345");
    expect(() => queue.enqueue("x")).toThrow(/przeciążona/);
    queue.close();
    expect(queue.queuedBytes()).toBe(0);
  });
});
