import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { EditableQueue } from "./starter";

describe("EditableQueue", () => {
  it("wiąże lokalny draft ze stabilnym ID po reorderze", async () => {
    const { user } = renderWithUser(
      <EditableQueue
        initialItems={[
          { id: "a", title: "Awaria" },
          { id: "b", title: "Błąd płatności" },
        ]}
      />,
    );
    await user.type(
      screen.getByRole("textbox", { name: "Notatka dla Awaria" }),
      "Priorytet P1",
    );

    await user.click(screen.getByRole("button", { name: "Odwróć kolejność" }));

    expect(screen.getByRole("textbox", { name: "Notatka dla Awaria" }))
      .toHaveValue("Priorytet P1");
    expect(screen.getByRole("textbox", { name: "Notatka dla Błąd płatności" }))
      .toHaveValue("");
  });
});
