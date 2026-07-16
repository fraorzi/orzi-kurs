import { describe, expect, it } from "vitest";
import {
  render,
  screen,
} from "@harness/react-test";
import { ApiKeyField } from "./starter";

describe("ApiKeyField", () => {
  it("tworzy odrębne relacje dostępności dla każdej instancji", () => {
    render(
      <>
        <ApiKeyField
          label="Klucz produkcyjny"
          hint="Używany wyłącznie na produkcji."
        />
        <ApiKeyField
          label="Klucz testowy"
          hint="Można używać lokalnie."
        />
      </>,
    );

    const production = screen.getByRole("textbox", {
      name: "Klucz produkcyjny",
    });
    const test = screen.getByRole("textbox", { name: "Klucz testowy" });

    expect(production).toHaveAccessibleDescription(
      "Używany wyłącznie na produkcji.",
    );
    expect(test).toHaveAccessibleDescription("Można używać lokalnie.");
    expect(production.id).not.toBe(test.id);
    expect(production.getAttribute("aria-describedby"))
      .not.toBe(test.getAttribute("aria-describedby"));
  });
});
