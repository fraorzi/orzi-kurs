import { describe, it, expect } from "vitest";
import { createCalculator, createLadder } from "./starter.js";

describe("createCalculator", () => {
  it("read zapisuje wartości, sum i mul liczą na nich", () => {
    const calc = createCalculator();
    calc.read(2, 3);
    expect(calc.sum(), "sum ma czytać wartości zapisane przez read na this").toBe(5);
    expect(calc.mul()).toBe(6);
  });

  it("ponowny read nadpisuje wartości", () => {
    const calc = createCalculator();
    calc.read(1, 1);
    calc.read(10, 20);
    expect(calc.sum()).toBe(30);
  });

  it("dwa kalkulatory nie współdzielą stanu", () => {
    const a = createCalculator();
    const b = createCalculator();
    a.read(1, 2);
    b.read(100, 200);
    expect(a.sum(), "każdy kalkulator trzyma własne wartości na SWOIM this").toBe(3);
  });
});

describe("createLadder", () => {
  it("up i down zmieniają step o 1", () => {
    const ladder = createLadder();
    ladder.up();
    ladder.up();
    ladder.down();
    expect(ladder.getStep()).toBe(1);
  });

  it("chaining działa: up().up().down() na jednym obiekcie", () => {
    const ladder = createLadder();
    expect(
      ladder.up().up().down().getStep(),
      "up/down muszą zwracać this — inaczej łańcuch wywołań się urywa na undefined",
    ).toBe(1);
  });

  it("startowy step to 0", () => {
    expect(createLadder().getStep()).toBe(0);
  });
});
