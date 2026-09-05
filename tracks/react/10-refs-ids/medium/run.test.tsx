import { describe, expect, it } from "vitest";
import { render, screen } from "@harness/react-test";
import { ApiKeyField } from "./starter";

describe("ApiKeyField", () => {
  it("tworzy odrębne ID i etykiety dla każdej instancji", () => {
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
    const test = screen.getByRole("textbox", {
      name: "Klucz testowy",
    });

    expect(
      screen.getByText("Używany wyłącznie na produkcji."),
    ).toBeVisible();
    expect(
      screen.getByText("Można używać lokalnie."),
    ).toBeVisible();
    expect(production.id).not.toBe("");
    expect(test.id).not.toBe("");
    expect(production.id).not.toBe(test.id);
  });
});
