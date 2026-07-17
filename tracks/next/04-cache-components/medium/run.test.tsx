import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("dashboard static shell", () => {
  it("izoluje pracę request-time pod wąskim Suspense", () => {
    const page = readFileSync(
      join(process.cwd(), "tracks/next/04-cache-components/medium/src/page.tsx"),
      "utf8",
    );

    expect(page).toContain('import { Suspense } from "react"');
    expect(page).toContain("<Suspense");
    expect(page).toContain("Ładowanie użytkownika…");
    expect(page).toContain("<ViewerGreeting />");
    expect(page).not.toContain("await ViewerGreeting");
    expect(page).not.toMatch(/export default async function Page/);
  });

  it("pozostawia oczekiwanie w dynamicznym komponencie", () => {
    const greeting = readFileSync(
      join(
        process.cwd(),
        "tracks/next/04-cache-components/medium/src/ViewerGreeting.tsx",
      ),
      "utf8",
    );

    expect(greeting).toMatch(/export async function ViewerGreeting/);
    expect(greeting).toContain("await readViewer()");
  });
});
