import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("klasyfikacja mechanizmu pracy", () => {
  it("sieciowe I/O zostaje async niezależnie od czasu", () => {
    expect(solve({ kind: "network", estimatedMs: 5 })).toBe("async");
    expect(solve({ kind: "network", estimatedMs: 5000 })).toBe("async");
  });

  it("zewnętrzny program to child_process niezależnie od czasu", () => {
    expect(solve({ kind: "external", estimatedMs: 1 })).toBe("child_process");
    expect(solve({ kind: "external", estimatedMs: 10_000 })).toBe(
      "child_process",
    );
  });

  it("długie CPU idzie do workera", () => {
    expect(solve({ kind: "cpu", estimatedMs: 20 })).toBe("worker");
    expect(solve({ kind: "cpu", estimatedMs: 500 })).toBe("worker");
  });

  it("krótkie CPU zostaje w wątku głównym", () => {
    expect(solve({ kind: "cpu", estimatedMs: 19 })).toBe("async");
    expect(solve({ kind: "cpu", estimatedMs: 1 })).toBe("async");
  });
});
