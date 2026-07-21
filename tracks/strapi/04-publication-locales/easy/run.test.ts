import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("oddzielenie preview od odczytu publicznego", () => {
  it("zwraca draft dla preview i roli editor razem", () => {
    expect(solve(true, "editor")).toBe("draft");
  });

  it("zwraca published, gdy brakuje roli mimo preview", () => {
    expect(solve(true)).toBe("published");
  });

  it("zwraca published dla roli innej niż editor mimo preview", () => {
    expect(solve(true, "viewer")).toBe("published");
  });

  it("zwraca published, gdy preview jest false, nawet z rolą editor", () => {
    expect(solve(false, "editor")).toBe("published");
  });
});
