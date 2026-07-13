import { describe, it, expect } from "vitest";
import { expectScaling } from "@harness/bench";
import { attachUsers } from "./starter.js";

describe("attachUsers — poprawność", () => {
  it("dołącza użytkownika po userId", () => {
    expect(
      attachUsers(
        [{ id: 1, userId: 10 }, { id: 2, userId: 20 }],
        [{ id: 10, name: "Ala" }, { id: 20, name: "Ola" }],
      ),
    ).toEqual([
      { id: 1, userId: 10, user: { id: 10, name: "Ala" } },
      { id: 2, userId: 20, user: { id: 20, name: "Ola" } },
    ]);
  });

  it("gdy brak pasującego użytkownika, user to null", () => {
    expect(attachUsers([{ id: 1, userId: 99 }], [])).toEqual([
      { id: 1, userId: 99, user: null },
    ]);
  });

  it("nie mutuje wejściowych zamówień", () => {
    const orders = [{ id: 1, userId: 10 }];
    attachUsers(orders, [{ id: 10, name: "Ala" }]);
    expect(orders, "attachUsers ma zwrócić nowe obiekty, nie dopisywać do wejścia").toEqual([
      { id: 1, userId: 10 },
    ]);
  });
});

describe("attachUsers — złożoność", () => {
  it("działa w czasie liniowym, nie kwadratowym (gdy obie listy rosną)", () => {
    expectScaling({
      fn: ({ orders, users }) => attachUsers(orders, users),
      makeInput: (n) => ({
        orders: Array.from({ length: n }, (_, i) => ({ id: i, userId: i })),
        users: Array.from({ length: n }, (_, i) => ({ id: i, name: `u${i}` })),
      }),
      sizes: [2000, 20000],
      expect: "linear",
    });
  });
});
