import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { VirtualCustomerList } from "./starter";

describe("VirtualCustomerList", () => {
  it("renderuje małe okno przez react-window 2 i zachowuje akcję wiersza", async () => {
    const customers = Array.from({ length: 1000 }, (_, index) => ({
      id: `customer-${index}`,
      name: `Klient ${index}`,
    }));
    const onOpen = vi.fn();
    const { user } = renderWithUser(
      <VirtualCustomerList customers={customers} onOpen={onOpen} />,
    );

    const buttons = screen.getAllByRole("button", { name: /Otwórz Klient/ });
    expect(buttons.length).toBeGreaterThan(0);
    expect(buttons.length).toBeLessThan(20);
    await user.click(buttons[0]);
    expect(onOpen).toHaveBeenCalledWith("customer-0");

    const firstRow = buttons[0].parentElement;
    expect(firstRow).toHaveAttribute("role", "listitem");
    expect(firstRow).toHaveAttribute("aria-posinset", "1");
    expect(firstRow).toHaveAttribute("aria-setsize", "1000");
  });

  it("używa aktualnego API List zamiast historycznego v1", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "tracks/react/29-large-lists/hard/starter.tsx",
      ),
      "utf8",
    );

    expect(source).toMatch(/import\s*{[\s\S]*List[\s\S]*}\s*from\s*"react-window"/);
    expect(source).toContain("RowComponentProps");
    expect(source).not.toContain("FixedSizeList");
  });
});
