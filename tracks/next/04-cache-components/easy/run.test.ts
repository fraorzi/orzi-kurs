import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import nextConfig from "./starter";

describe("next.config Cache Components", () => {
  it("włącza stabilną flagę Next 16", () => {
    expect(nextConfig.cacheComponents).toBe(true);
  });

  it("nie przywraca usuniętych flag eksperymentalnych", () => {
    const source = readFileSync(
      join(process.cwd(), "tracks/next/04-cache-components/easy/starter.ts"),
      "utf8",
    );

    expect(source).not.toMatch(/experimental\s*:/);
    expect(source).not.toMatch(/\b(?:dynamicIO|useCache|ppr)\b/);
  });
});
