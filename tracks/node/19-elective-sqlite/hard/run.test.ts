import { describe, expect, it } from "vitest";
import { solve } from "./starter";

const m = (version: number) => ({ version, sql: `-- v${version}` });

describe("plan migracji", () => {
  it("wybiera migracje nowsze od bieżącej wersji, posortowane rosnąco", () => {
    expect(solve(1, [m(3), m(1), m(2)])).toEqual([m(2), m(3)]);
  });

  it("aktualna baza daje pusty plan", () => {
    expect(solve(3, [m(1), m(2), m(3)])).toEqual([]);
  });

  it("odrzuca duplikaty i wersje niepoprawne", () => {
    expect(() => solve(0, [m(1), m(1)])).toThrow();
    expect(() => solve(0, [m(0)])).toThrow();
    expect(() => solve(0, [{ version: 1.5, sql: "" }])).toThrow();
  });

  it("odrzuca lukę względem bieżącej wersji i wewnątrz planu", () => {
    expect(() => solve(2, [m(4), m(5)])).toThrow();
    expect(() => solve(0, [m(1), m(3)])).toThrow();
  });
});
