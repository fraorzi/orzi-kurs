import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { renderWithUser, screen } from "@harness/next-test";
import { CustomerPanel } from "./src/CustomerPanel";

describe("customer server-only boundary", () => {
  it("przekazuje do interaktywnego panelu wyłącznie DTO", async () => {
    const { user } = renderWithUser(
      <CustomerPanel
        customer={{
          id: "customer-1",
          name: "Alicja",
          email: "alicja@example.com",
        }}
      />,
    );
    expect(screen.queryByText("alicja@example.com")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Pokaż kontakt" }));

    expect(screen.getByText("alicja@example.com")).toBeInTheDocument();
  });

  it("chroni DAL i nie importuje go do client module graph", () => {
    const root = join(
      process.cwd(),
      "tracks/next/02-server-client-boundaries/hard/src",
    );
    const dataSource = readFileSync(join(root, "lib/customer-data.ts"), "utf8");
    const clientSource = readFileSync(join(root, "CustomerPanel.tsx"), "utf8");
    const pageSource = readFileSync(join(root, "CustomerPage.tsx"), "utf8");

    expect(dataSource.trimStart().startsWith('import "server-only"')).toBe(true);
    expect(clientSource).not.toContain("./lib/customer-data");
    expect(clientSource).toContain('import type { CustomerSummary } from "./types"');
    expect(pageSource).toContain("getCustomerSummary(id)");
  });
});
