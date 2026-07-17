import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Zweryfikuj metadane uploadu", () => {
  it("spełnia kontrakt produkcyjny", async () => {
    expect(solve({ mime: "image/webp", size: 1024 })).toBe(true);
    expect(solve({ mime: "image/svg+xml", size: 1024 })).toBe(false);
    expect(solve({ mime: "image/png", size: 6 * 1024 * 1024 })).toBe(false);
  });
});

