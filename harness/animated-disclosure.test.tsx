// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AnimatedDisclosure from "../app/components/AnimatedDisclosure";

describe("AnimatedDisclosure", () => {
  it("keeps collapsed content inert and exposes it after opening", () => {
    render(
      <AnimatedDisclosure trigger="Kolejka nauki">
        <a href="https://example.com/task">Pierwsze zadanie</a>
      </AnimatedDisclosure>,
    );

    const trigger = screen.getByRole("button", { name: "Kolejka nauki" });
    const region = screen.getByRole("region", { hidden: true });
    const link = within(region).getByRole("link", { hidden: true });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-controls", region.id);
    expect(region).toHaveAttribute("aria-labelledby", trigger.id);
    expect(region).toHaveAttribute("aria-hidden", "true");
    expect(region).toHaveAttribute("inert");
    expect(link).toBeInTheDocument();

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(region).not.toHaveAttribute("aria-hidden");
    expect(region).not.toHaveAttribute("inert");
    expect(region).toHaveAttribute("data-open", "true");

    fireEvent.click(trigger);
    expect(region).toHaveAttribute("data-open", "false");
    expect(region).toHaveAttribute("inert");
  });

  it("supports disclosures that should start open", () => {
    render(
      <AnimatedDisclosure defaultOpen trigger="Testy 1/2">
        <p>Nieudany test</p>
      </AnimatedDisclosure>,
    );

    expect(screen.getByRole("button", { name: "Testy 1/2" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("region")).not.toHaveAttribute("inert");
  });

  it("mounts lazy content only after the first opening", () => {
    render(
      <AnimatedDisclosure lazy trigger="Porównaj rozwiązania">
        <p>Ciężkie porównanie</p>
      </AnimatedDisclosure>,
    );

    expect(screen.queryByText("Ciężkie porównanie")).not.toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: "Porównaj rozwiązania" });
    fireEvent.click(trigger);
    expect(screen.getByText("Ciężkie porównanie")).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByText("Ciężkie porównanie")).toBeInTheDocument();
  });
});
