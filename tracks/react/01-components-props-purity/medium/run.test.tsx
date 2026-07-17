import { describe, expect, it, vi } from "vitest";
import {
  render,
  screen,
} from "@harness/react-test";
import { Panel } from "./starter";

describe("Panel", () => {
  it("renderuje tytuł i dowolne interaktywne children", () => {
    const onClick = vi.fn();
    render(
      <Panel title="Ustawienia">
        <button type="button" onClick={onClick}>Zapisz</button>
      </Panel>,
    );

    expect(screen.getByRole("heading", { name: "Ustawienia" }))
      .toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Zapisz" }))
      .toBeInTheDocument();
  });

  it("używa info jako domyślnego tone", () => {
    render(
      <Panel title="Informacja">Treść</Panel>,
    );

    expect(screen.getByRole("region", { name: "Informacja" })).toHaveAttribute(
      "data-tone",
      "info",
    );
  });

  it("przekazuje jawny wariant warning do DOM", () => {
    render(
      <Panel title="Uwaga" tone="warning">Sprawdź dane</Panel>,
    );

    expect(screen.getByRole("region", { name: "Uwaga" })).toHaveAttribute(
      "data-tone",
      "warning",
    );
  });
});
