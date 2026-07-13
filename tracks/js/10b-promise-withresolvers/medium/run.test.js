import { describe, it, expect } from "vitest";
import { createGate } from "./starter.js";

describe("createGate", () => {
  it("czekający await rusza dopiero po open() i dostaje jego wartość", async () => {
    const gate = createGate();
    const order = [];
    const worker = (async () => {
      const v = await gate.opened;
      order.push("po-await");
      return v;
    })();

    // Damy mikrozadaniom szansę: worker musi UTKNĄĆ na await, nie ruszyć sam.
    await Promise.resolve();
    expect(order, "przed open() nic nie powinno przejść przez bramkę").toEqual([]);

    gate.open("go");
    await expect(worker, "open('go') ma rozstrzygnąć opened wartością 'go'").resolves.toBe("go");
  });

  it("wielu czekających rusza z jednego open()", async () => {
    const gate = createGate();
    const a = (async () => `a:${await gate.opened}`)();
    const b = (async () => `b:${await gate.opened}`)();
    gate.open("x");
    expect(
      await Promise.all([a, b]),
      "opened jest współdzielona — jedno open() budzi wszystkich czekających",
    ).toEqual(["a:x", "b:x"]);
  });

  it("await po otwarciu zwraca wartość natychmiast", async () => {
    const gate = createGate();
    gate.open(99);
    await expect(gate.opened, "bramka jest jednorazowa — po open() opened już jest rozstrzygnięta").resolves.toBe(99);
  });

  it("fail() odrzuca opened błędem", async () => {
    const gate = createGate();
    gate.fail(new Error("zamknięte"));
    await expect(gate.opened).rejects.toThrow("zamknięte");
  });
});
