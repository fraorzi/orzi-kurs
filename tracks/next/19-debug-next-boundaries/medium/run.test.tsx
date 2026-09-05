import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderWithUser, screen } from "@harness/next-test";
import { describe, expect, it } from "vitest";
import { FilterButton } from "./src/FilterButton";

describe("narrow client boundary", () => {
  it("zachowuje interakcję liścia", async () => {
    const { user } = renderWithUser(<FilterButton />);
    const button = screen.getByRole("button", {
      name: "Tylko aktywne",
    });
    expect(button).toHaveTextContent("Tylko aktywne");
    await user.click(button);
    expect(button).toHaveTextContent("Pokaż wszystkie");
  });

  it("nie klasyfikuje barrellu i serwerowego panelu jako client", () => {
    const root = join(
      process.cwd(),
      "tracks/next/19-debug-next-boundaries/medium/src",
    );
    const barrel = readFileSync(
      join(root, "index.ts"),
      "utf8",
    );
    const filter = readFileSync(
      join(root, "FilterButton.tsx"),
      "utf8",
    );
    const metrics = readFileSync(
      join(root, "MetricsPanel.tsx"),
      "utf8",
    );
    const dal = readFileSync(
      join(root, "metrics-dal.ts"),
      "utf8",
    );
    expect(barrel.trimStart()).not.toMatch(
      /^['"]use client['"]/,
    );
    expect(filter.trimStart()).toMatch(
      /^['"]use client['"]/,
    );
    expect(metrics).not.toMatch(/['"]use client['"]/);
    expect(dal.trimStart()).toMatch(
      /^import ['"]server-only['"]/,
    );
  });
});
