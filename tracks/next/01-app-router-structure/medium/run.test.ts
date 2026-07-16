import { describe, expect, it } from "vitest";
import { routePathForFile } from "./starter";

describe("routePathForFile", () => {
  it.each([
    ["app/page.tsx", "/"],
    ["src/app/(ops)/reports/[id]/page.tsx", "/reports/[id]"],
    ["app\\(shop)\\cart\\route.ts", "/cart"],
    ["app/@analytics/page.tsx", "/"],
    ["app/%5Finternal/page.tsx", "/%5Finternal"],
  ])("mapuje %s na %s", (filePath, expected) => {
    expect(routePathForFile(filePath)).toBe(expected);
  });

  it.each([
    "components/page.tsx",
    "app/(marketing)/layout.tsx",
    "app/blog/_components/page.tsx",
    "app/blog/page.jsx",
  ])("odrzuca plik bez publicznego kontraktu trasy: %s", (filePath) => {
    expect(routePathForFile(filePath)).toBeNull();
  });
});
