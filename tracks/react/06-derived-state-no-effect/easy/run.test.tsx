import { describe, expect, it } from "vitest";
import {
  render,
  screen,
} from "@harness/react-test";
import { OrderSummary } from "./starter";

describe("OrderSummary", () => {
  it("przelicza sumę po zmianie propsów", () => {
    const { rerender } = render(
      <OrderSummary
        items={[{ id: "a", quantity: 2, unitPriceCents: 750 }]}
      />,
    );
    expect(screen.getByRole("status", { name: "Suma" }))
      .toHaveTextContent("15.00 zł");

    rerender(
      <OrderSummary
        items={[
          { id: "a", quantity: 1, unitPriceCents: 750 },
          { id: "b", quantity: 2, unitPriceCents: 250 },
        ]}
      />,
    );
    expect(screen.getByRole("status", { name: "Suma" }))
      .toHaveTextContent("12.50 zł");
  });
});
