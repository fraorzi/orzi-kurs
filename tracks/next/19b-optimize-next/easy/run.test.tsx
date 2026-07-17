import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderWithUser, screen } from "@harness/next-test";
import { describe, expect, it } from "vitest";
import { Dashboard } from "./src/Dashboard";

describe("Dashboard client graph", () => {
  it("zachowuje chart i interaktywne filtry", async () => {
    const { user } = renderWithUser(<Dashboard />);
    expect(screen.getByRole("figure", { name: "Wykres przychodu" })).toBeInTheDocument();
    await user.selectOptions(screen.getByRole("combobox", { name: "Okres" }), "30d");
    expect(screen.getByRole("combobox", { name: "Okres" })).toHaveValue("30d");
  });

  it("[quality] utrzymuje client graph w budżecie 10 jednostek", () => {
    const root = join(process.cwd(), "tracks/next/19b-optimize-next/easy/src");
    const dashboardClient = readFileSync(join(root, "Dashboard.tsx"), "utf8")
      .trimStart().startsWith('"use client"');
    const filtersClient = readFileSync(join(root, "Filters.tsx"), "utf8")
      .trimStart().startsWith('"use client"');
    const estimatedWeight = dashboardClient ? 95 : filtersClient ? 5 : 0;
    expect(estimatedWeight).toBeLessThanOrEqual(10);
  });
});
