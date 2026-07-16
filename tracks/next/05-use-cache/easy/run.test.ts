import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("getCatalog cache contract", () => {
  it("definiuje cache i jego lifetime w tym samym scope", () => {
    const source = readFileSync(
      join(process.cwd(), "tracks/next/05-use-cache/easy/starter.ts"),
      "utf8",
    );
    const functionStart = source.indexOf("export async function getCatalog");
    const body = source.slice(functionStart);

    expect(source.trimStart().startsWith('"use cache"')).toBe(false);
    expect(body).toMatch(/\{\s*"use cache";/);
    expect(body).toContain('cacheLife("hours")');
  });
});
