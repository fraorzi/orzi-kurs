import { render, screen } from "@harness/react-test";
import { describe, expect, it } from "vitest";
import Loading from "./starter";

describe("loading.tsx", () => {
  it("komunikuje stan bez blokowania accessibility tree", () => {
    render(<Loading />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveAttribute("aria-busy", "true");
    expect(status).toHaveTextContent("Ładowanie zamówień…");
  });

  it("rezerwuje miejsce dla trzech dekoracyjnych wierszy", () => {
    const { container } = render(<Loading />);
    const skeleton = container.querySelector('[aria-hidden="true"]');
    expect(skeleton).toHaveStyle({ minHeight: "240px" });
    expect(skeleton?.querySelectorAll("[data-skeleton-row]")).toHaveLength(3);
  });
});
