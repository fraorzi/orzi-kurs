import { describe, it, expect } from "vitest";
import { makeArmy } from "./starter.js";

describe("makeArmy", () => {
  it("strzelec numer i zwraca i", () => {
    const army = makeArmy();
    expect(
      army[0](),
      "wszyscy strzelcy domykają JEDNĄ zmienną i, która po pętli ma wartość 10 — każdy strzelec musi dostać własną kopię swojego numeru",
    ).toBe(0);
    expect(army[5]()).toBe(5);
    expect(army[9]()).toBe(9);
  });

  it("armia ma dokładnie 10 strzelców", () => {
    expect(makeArmy()).toHaveLength(10);
  });

  it("każdy strzelec zwraca swój numer niezależnie od kolejności wywołań", () => {
    const army = makeArmy();
    const results = [army[7](), army[2](), army[7]()];
    expect(
      results,
      "wywołanie jednego strzelca nie może wpływać na wynik innego — każdy trzyma własny numer",
    ).toEqual([7, 2, 7]);
  });
});
