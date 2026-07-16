import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { CommandPalette } from "./starter";

describe("CommandPalette", () => {
  it("przekazuje ref jako prop i ustawia focus na wewnętrznym polu", async () => {
    const { user } = renderWithUser(<CommandPalette />);
    const input = screen.getByRole("searchbox", { name: "Szukaj polecenia" });

    await user.click(
      screen.getByRole("button", { name: "Przejdź do wyszukiwania" }),
    );

    expect(input).toHaveFocus();
  });
});

