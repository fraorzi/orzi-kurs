import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import RootLayout from "./src/app/layout";
import WorkspaceLayout from "./src/app/(workspace)/layout";
import ReportsPage from "./src/app/(workspace)/reports/page";

describe("layout ownership", () => {
  it("renderuje shell workspace'u tylko wokół jego stron", () => {
    const workspaceMarkup = renderToStaticMarkup(
      <RootLayout>
        <WorkspaceLayout><ReportsPage /></WorkspaceLayout>
      </RootLayout>,
    );
    expect(workspaceMarkup).toContain('aria-label="Workspace"');
    expect(workspaceMarkup).toContain('<a href="/reports">Raporty</a>');
    expect(workspaceMarkup).toContain("<main><section><h1>Raporty</h1>");
    expect(workspaceMarkup).toContain("Gotowe raporty: 3");

    const publicMarkup = renderToStaticMarkup(
      <RootLayout><h1>Strona publiczna</h1></RootLayout>,
    );
    expect(publicMarkup).not.toContain('aria-label="Workspace"');
  });

  it("zachowuje route group i prywatny komponent w strukturze feature'u", () => {
    const root = join(
      process.cwd(),
      "tracks/next/01-app-router-structure/hard/src/app",
    );
    expect(existsSync(join(root, "(workspace)/reports/page.tsx"))).toBe(true);
    expect(existsSync(join(root, "(workspace)/_components/ReportSummary.tsx")))
      .toBe(true);
    expect(readFileSync(join(root, "layout.tsx"), "utf8"))
      .not.toContain('href="/reports"');
  });
});
