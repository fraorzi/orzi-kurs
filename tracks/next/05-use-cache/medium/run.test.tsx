import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("ProfilePage cache boundary", () => {
  it("czyta runtime API poza cache i przekazuje serializowalny klucz", () => {
    const source = readFileSync(
      join(process.cwd(), "tracks/next/05-use-cache/medium/src/ProfilePage.tsx"),
      "utf8",
    );
    const cachedStart = source.indexOf("async function CachedProfile");
    const pageStart = source.indexOf("export async function ProfilePage");

    expect(cachedStart).toBeGreaterThan(-1);
    expect(pageStart).toBeGreaterThan(cachedStart);

    const cachedScope = source.slice(cachedStart, pageStart);
    const pageScope = source.slice(pageStart);

    expect(cachedScope).toContain('"use cache"');
    expect(cachedScope).toContain('cacheLife("minutes")');
    expect(cachedScope).toContain("readProfile(sessionId)");
    expect(cachedScope).not.toContain("cookies()");
    expect(pageScope).toContain("await cookies()");
    expect(pageScope).not.toContain('"use cache"');
    expect(pageScope).toContain("<CachedProfile sessionId={sessionId} />");
  });
});
