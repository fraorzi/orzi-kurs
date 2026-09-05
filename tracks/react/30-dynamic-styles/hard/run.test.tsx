import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { render, screen } from "@harness/react-test";
import { MetricChart } from "./starter";

describe("MetricChart", () => {
  it("przekazuje token motywu i znormalizowane dane przez custom properties", () => {
    render(
      <MetricChart
        label="Aktywne konta"
        accent="#2563eb"
        points={[
          { id: "pl", label: "Polska", value: 30 },
          { id: "de", label: "Niemcy", value: 60 },
        ]}
      />,
    );

    const chart = screen.getByRole("region", {
      name: "Aktywne konta",
    });
    const poland = screen.getByRole("meter", {
      name: "Polska",
    });
    const germany = screen.getByRole("meter", {
      name: "Niemcy",
    });

    expect(
      chart.style.getPropertyValue("--chart-accent"),
    ).toBe("#2563eb");
    expect(
      poland.style.getPropertyValue("--bar-ratio"),
    ).toBe("0.5");
    expect(
      germany.style.getPropertyValue("--bar-ratio"),
    ).toBe("1");
  });

  it("pozostawia końcowe reguły wizualne w CSS", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "tracks/react/30-dynamic-styles/hard/starter.tsx",
      ),
      "utf8",
    );

    expect(source).toContain('"--chart-accent"');
    expect(source).toContain('"--bar-ratio"');
    expect(source).not.toMatch(
      /\b(?:backgroundColor|height)\s*:/,
    );
  });
});
