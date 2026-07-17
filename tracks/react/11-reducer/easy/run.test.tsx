import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { QuantityPicker } from "./starter";

describe("QuantityPicker", () => {
  it("pilnuje minimum i resetuje do wartości początkowej", async () => {
    const { user } = renderWithUser(<QuantityPicker initialQuantity={3} />);
    const quantity = screen.getByRole("status", { name: "Ilość" });

    await user.click(screen.getByRole("button", { name: "Zmniejsz" }));
    await user.click(screen.getByRole("button", { name: "Zmniejsz" }));
    await user.click(screen.getByRole("button", { name: "Zmniejsz" }));
    expect(quantity).toHaveTextContent("1");

    await user.click(screen.getByRole("button", { name: "Zwiększ" }));
    expect(quantity).toHaveTextContent("2");

    await user.click(screen.getByRole("button", { name: "Resetuj" }));
    expect(quantity).toHaveTextContent("3");
  });
});
