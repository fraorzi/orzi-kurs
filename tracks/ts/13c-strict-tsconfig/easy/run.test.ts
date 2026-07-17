import { describe, expect, it } from "vitest";
import { findCached, firstCached, type User } from "./starter";

const cache: Readonly<Record<string, User>> = {
  u1: { id: "u1", name: "Ala" },
  u2: { id: "u2", name: "Ola" },
};

describe("cache", () => {
  it("zwraca trafienie i null dla braku", () => {
    expect(findCached(cache, "u1")).toEqual({ id: "u1", name: "Ala" });
    expect(findCached(cache, "missing")).toBeNull();
  });

  it("szuka po kolei i omija brakujące klucze", () => {
    expect(firstCached(cache, ["missing", "u2", "u1"])).toEqual({
      id: "u2",
      name: "Ola",
    });
  });

  it("obsługuje pustą listę i same pudła", () => {
    expect(firstCached(cache, [])).toBeNull();
    expect(firstCached(cache, ["x", "y"])).toBeNull();
  });
});
