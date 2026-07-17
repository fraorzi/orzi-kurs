import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import {
  ContactEditor,
  type Contact,
} from "./starter";

const ALA: Contact = { id: "a", name: "Ala" };
const OLA: Contact = { id: "b", name: "Ola" };

describe("ContactEditor", () => {
  it("pokazuje nazwę wybranego kontaktu", () => {
    renderWithUser(<ContactEditor selected={ALA} />);

    expect(screen.getByRole("textbox", { name: "Nazwa kontaktu" }))
      .toHaveValue("Ala");
  });

  it("resetuje lokalny draft po zmianie selected.id", async () => {
    const { rerender, user } = renderWithUser(
      <ContactEditor selected={ALA} />,
    );
    const input = screen.getByRole("textbox", { name: "Nazwa kontaktu" });
    await user.type(input, " Nowak");
    expect(input).toHaveValue("Ala Nowak");

    rerender(<ContactEditor selected={OLA} />);
    expect(screen.getByRole("textbox", { name: "Nazwa kontaktu" }))
      .toHaveValue("Ola");

    rerender(<ContactEditor selected={ALA} />);
    expect(screen.getByRole("textbox", { name: "Nazwa kontaktu" }))
      .toHaveValue("Ala");
  });
});
