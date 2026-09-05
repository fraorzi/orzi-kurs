import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { AdaptiveTooltip } from "./starter";

function rect({
  top,
  bottom,
  height,
}: {
  top: number;
  bottom: number;
  height: number;
}): DOMRect {
  return {
    x: 0,
    y: top,
    top,
    right: 100,
    bottom,
    left: 0,
    width: 100,
    height,
    toJSON: () => ({}),
  };
}

describe("AdaptiveTooltip", () => {
  it("mierzy layout przed repaintem i reaguje na zmianę treści", async () => {
    let anchorTop = 500;
    let anchorBottom = 540;
    let tooltipHeight = 120;
    vi.stubGlobal("innerHeight", 600);
    const getBoundingClientRect = vi
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockImplementation(function (this: HTMLElement) {
        return this.getAttribute("role") === "tooltip"
          ? rect({
              top: 0,
              bottom: tooltipHeight,
              height: tooltipHeight,
            })
          : rect({
              top: anchorTop,
              bottom: anchorBottom,
              height: anchorBottom - anchorTop,
            });
      });

    try {
      const { rerender, user } = renderWithUser(
        <AdaptiveTooltip label="Pełny opis" />,
      );
      await user.click(
        screen.getByRole("button", { name: "Szczegóły" }),
      );

      expect(screen.getByRole("tooltip")).toHaveAttribute(
        "data-placement",
        "top",
      );

      anchorTop = 20;
      anchorBottom = 60;
      tooltipHeight = 40;
      rerender(<AdaptiveTooltip label="Krótszy opis" />);

      expect(screen.getByRole("tooltip")).toHaveAttribute(
        "data-placement",
        "bottom",
      );
    } finally {
      getBoundingClientRect.mockRestore();
      vi.unstubAllGlobals();
    }
  });

  it("używa useLayoutEffect tylko dla pomiaru wpływającego na układ", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "tracks/react/23-refs-layout/hard/starter.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("useLayoutEffect");
  });
});
