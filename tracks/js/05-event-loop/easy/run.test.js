import { describe, it, expect } from "vitest";
import { scheduleLogs } from "./starter.js";

describe("scheduleLogs", () => {
  it("sync jest zalogowany natychmiast, reszta jeszcze nie", () => {
    const order = [];
    scheduleLogs((label) => order.push(label));
    expect(
      order,
      'zaraz po wywołaniu ma być tylko "sync" — mikro- i makrotaski czekają w kolejkach, nie wykonują się od razu',
    ).toEqual(["sync"]);
  });

  it("micro wykonuje się przed macro (mikrotaski mają priorytet)", async () => {
    const order = [];
    scheduleLogs((label) => order.push(label));
    await Promise.resolve();
    expect(
      order,
      'po opróżnieniu mikrotasków ma być ["sync", "micro"] — makrotask (setTimeout) wciąż czeka',
    ).toEqual(["sync", "micro"]);
  });

  it("macro wykonuje się na końcu", async () => {
    const order = [];
    scheduleLogs((label) => order.push(label));
    await new Promise((r) => setTimeout(r, 5));
    expect(order).toEqual(["sync", "micro", "macro"]);
  });
});
