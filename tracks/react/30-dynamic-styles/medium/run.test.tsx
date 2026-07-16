import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { render, screen } from "@harness/react-test";
import { StatusBadge } from "./starter";

describe("StatusBadge", () => {
  it("aktualizuje custom property bez duplikowania reguł wyglądu", () => {
    const { rerender } = render(
      <StatusBadge label="W toku" accent="oklch(65% 0.2 250)" />,
    );
    const badge = screen.getByText("W toku");

    expect(badge).toHaveClass("status-badge");
    expect(badge.style.getPropertyValue("--badge-accent"))
      .toBe("oklch(65% 0.2 250)");

    rerender(<StatusBadge label="W toku" accent="#c2410c" />);
    expect(badge.style.getPropertyValue("--badge-accent")).toBe("#c2410c");
    expect(badge.style.backgroundColor).toBe("");
  });

  it("opisuje obsługiwany token wąskim typem", () => {
    const source = readFileSync(
      join(process.cwd(), "tracks/react/30-dynamic-styles/medium/starter.tsx"),
      "utf8",
    );

    expect(source).toContain("CSSProperties");
    expect(source).toContain('"--badge-accent"');
    expect(source).not.toMatch(/Record\s*<\s*string/);
  });
});
