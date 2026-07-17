import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { ProfileForm } from "./starter";

describe("ProfileForm", () => {
  it("wiąże komunikaty błędów z odpowiednimi polami", async () => {
    const onSave = vi.fn();
    const { user } = renderWithUser(<ProfileForm onSave={onSave} />);

    await user.type(screen.getByRole("textbox", { name: "Bio" }), "a".repeat(121));
    await user.click(screen.getByRole("button", { name: "Zapisz" }));

    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getByRole("textbox", { name: "Nazwa wyświetlana" }))
      .toHaveAccessibleDescription("Podaj nazwę wyświetlaną.");
    expect(screen.getByRole("textbox", { name: "Nazwa wyświetlana" }))
      .toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("textbox", { name: "Bio" }))
      .toHaveAccessibleDescription("Bio może mieć maksymalnie 120 znaków.");
  });

  it("wysyła przycięte poprawne dane", async () => {
    const onSave = vi.fn();
    const { user } = renderWithUser(<ProfileForm onSave={onSave} />);

    await user.type(
      screen.getByRole("textbox", { name: "Nazwa wyświetlana" }),
      "  Ada  ",
    );
    await user.type(screen.getByRole("textbox", { name: "Bio" }), "  Frontend  ");
    await user.click(screen.getByRole("button", { name: "Zapisz" }));

    expect(onSave).toHaveBeenCalledWith({
      displayName: "Ada",
      bio: "Frontend",
    });
  });
});
