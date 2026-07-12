import { describe, it, expect } from "vitest";
import { naturals, take } from "./starter.js";

describe("naturals + take", () => {
  it("take bierze pierwsze n liczb naturalnych z nieskończonego iterable", () => {
    expect(
      take(naturals(), 3),
      "naturals ma być nieskończony, a take pobierać leniwie — pierwsze 3 to [1,2,3]",
    ).toEqual([1, 2, 3]);
  });

  it("take zatrzymuje się, gdy iterable skończy się przed n", () => {
    expect(
      take([10, 20], 5),
      "gdy iterator zgłosi done przed osiągnięciem n, przerwij pętlę (break) i zwróć, co masz",
    ).toEqual([10, 20]);
  });

  it("take działa na Set i respektuje n = 0", () => {
    expect(take(new Set([1, 2, 3]), 2)).toEqual([1, 2]);
    expect(take(naturals(), 0), "dla n=0 nie wolno wołać next() ani razu").toEqual([]);
  });

  it("naturals daje niezależne przejścia (każde od 1)", () => {
    expect(take(naturals(), 2)).toEqual([1, 2]);
    expect(
      take(naturals(), 2),
      "każde wywołanie naturals()/nowa iteracja startuje od 1 — licznik trzymaj w iteratorze",
    ).toEqual([1, 2]);
  });
});
