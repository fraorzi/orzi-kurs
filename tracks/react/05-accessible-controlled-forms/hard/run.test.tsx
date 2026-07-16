import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { CheckoutForm } from "./starter";

describe("CheckoutForm", () => {
  it("opisuje błędy i fokusuje pierwsze niepoprawne pole", async () => {
    const onSubmit = vi.fn();
    const { user } = renderWithUser(<CheckoutForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Zamawiam" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Popraw dane formularza.",
    );
    expect(screen.getByRole("textbox", { name: "Imię i nazwisko" }))
      .toHaveFocus();
    expect(screen.getByRole("textbox", { name: "Imię i nazwisko" }))
      .toHaveAccessibleDescription("Podaj imię i nazwisko.");
    expect(screen.getByRole("textbox", { name: "E-mail" }))
      .toHaveAccessibleDescription("Podaj poprawny adres e-mail.");

    await user.type(
      screen.getByRole("textbox", { name: "Imię i nazwisko" }),
      "Ada Lovelace",
    );
    await user.type(screen.getByRole("textbox", { name: "E-mail" }), "ada");
    await user.type(
      screen.getByRole("textbox", { name: "Kod pocztowy" }),
      "00-001",
    );
    await user.click(screen.getByRole("button", { name: "Zamawiam" }));

    expect(screen.getByRole("textbox", { name: "E-mail" })).toHaveFocus();
  });

  it("wysyła znormalizowane poprawne dane", async () => {
    const onSubmit = vi.fn();
    const { user } = renderWithUser(<CheckoutForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByRole("textbox", { name: "Imię i nazwisko" }),
      "  Ada Lovelace  ",
    );
    await user.type(
      screen.getByRole("textbox", { name: "E-mail" }),
      "ADA@EXAMPLE.COM",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Kod pocztowy" }),
      "00-001",
    );
    await user.click(screen.getByRole("button", { name: "Zamawiam" }));

    expect(onSubmit).toHaveBeenCalledWith({
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      postalCode: "00-001",
    });
  });
});
