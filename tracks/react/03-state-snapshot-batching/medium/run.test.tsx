import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { BatchCounter } from "./starter";

describe("BatchCounter", () => {
  it("dodaje trzy przy każdym kliknięciu", async () => {
    const { user } = renderWithUser(<BatchCounter />);
    const result = screen.getByRole("status", { name: "Wynik" });

    expect(result).toHaveTextContent("0");

    await user.click(screen.getByRole("button", { name: "Dodaj 3" }));
    expect(result).toHaveTextContent("3");

    await user.click(screen.getByRole("button", { name: "Dodaj 3" }));
    expect(result).toHaveTextContent("6");
  });
});
