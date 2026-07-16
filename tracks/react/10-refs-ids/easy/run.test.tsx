import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { FocusField } from "./starter";

describe("FocusField", () => {
  it("fokusuje pole własnej instancji", async () => {
    const { user } = renderWithUser(
      <>
        <FocusField label="Pierwszy filtr" />
        <FocusField label="Drugi filtr" />
      </>,
    );

    await user.click(
      screen.getByRole("button", { name: "Ustaw focus: Drugi filtr" }),
    );
    expect(screen.getByRole("textbox", { name: "Drugi filtr" })).toHaveFocus();
    expect(screen.getByRole("textbox", { name: "Pierwszy filtr" }))
      .not.toHaveFocus();
  });
});
