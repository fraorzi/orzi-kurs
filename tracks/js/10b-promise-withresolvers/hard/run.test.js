import { describe, it, expect } from "vitest";
import { createQueue } from "./starter.js";

describe("createQueue", () => {
  it("wartości wepchnięte przed pull wychodzą w kolejności FIFO", async () => {
    const q = createQueue();
    q.push(1);
    q.push(2);
    q.push(3);
    expect([await q.pull(), await q.pull(), await q.pull()]).toEqual([1, 2, 3]);
  });

  it("pull na pustej kolejce czeka, aż pojawi się push", async () => {
    const q = createQueue();
    const pending = q.pull(); // pusto — musi czekać
    let settled = false;
    pending.then(() => {
      settled = true;
    });

    await Promise.resolve();
    expect(settled, "pull na pustej kolejce nie może rozstrzygnąć się przed push").toBe(false);

    q.push("później");
    await expect(pending, "push ma obudzić czekającego konsumenta jego wartością").resolves.toBe(
      "później",
    );
  });

  it("gdy czeka kilku konsumentów, kolejne push trafiają do nich w kolejności zgłoszeń", async () => {
    const q = createQueue();
    const first = q.pull();
    const second = q.pull();
    q.push("a");
    q.push("b");
    expect(
      [await first, await second],
      "pierwszy pull ma dostać pierwszy push (FIFO po stronie konsumentów)",
    ).toEqual(["a", "b"]);
  });

  it("mieszane wyprzedzanie: część wartości buforowana, część oczekiwana", async () => {
    const q = createQueue();
    q.push("x"); // buforowane
    const early = q.pull(); // dostaje "x" od razu
    const late = q.pull(); // pusto — czeka
    q.push("y");
    expect([await early, await late]).toEqual(["x", "y"]);
  });
});
