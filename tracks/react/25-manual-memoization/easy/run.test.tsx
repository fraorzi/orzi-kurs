import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { PricingPanel } from "./starter";

describe("PricingPanel", () => {
  it("powtarza kosztowną kalkulację tylko po zmianie jej danych", async () => {
    const calculateTotal = vi.fn(
      (lines: readonly { amount: number }[]) =>
        lines.reduce((sum, line) => sum + line.amount, 0),
    );
    const lines = [{ id: "1", amount: 120 }] as const;
    const { rerender, user } = renderWithUser(
      <PricingPanel lines={lines} calculateTotal={calculateTotal} />,
    );

    await user.type(screen.getByRole("textbox", { name: "Notatka" }), "pilne");

    expect(screen.getByText("Razem: 120 zł")).toBeInTheDocument();
    expect(calculateTotal).toHaveBeenCalledTimes(1);

    rerender(
      <PricingPanel
        lines={[...lines, { id: "2", amount: 30 }]}
        calculateTotal={calculateTotal}
      />,
    );

    expect(screen.getByText("Razem: 150 zł")).toBeInTheDocument();
    expect(calculateTotal).toHaveBeenCalledTimes(2);
  });
});

