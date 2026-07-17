import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import Page from "./src/page";

describe("uncached data boundary", () => {
  it("zwraca static shell bez oczekiwania na dane", () => {
    const result = Page();
    expect(result).not.toBeInstanceOf(Promise);
    expect(result.type).toBe("main");
  });

  it("wykonuje odczyt w async komponencie pod Suspense", () => {
    const source = readFileSync(join(
      process.cwd(),
      "tracks/next/19-debug-next-boundaries/hard/src/page.tsx",
    ), "utf8");
    expect(source).toMatch(/async function Activity\(\)[\s\S]*await getActivity\(\)/);
    expect(source).toMatch(/<Suspense[\s\S]*<Activity \/>[\s\S]*<\/Suspense>/);
    expect(source).toMatch(/export default function Page\(\)/);
  });
});
