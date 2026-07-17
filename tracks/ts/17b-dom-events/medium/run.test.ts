// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { parseLoginForm } from "./starter";

function form(html: string): HTMLFormElement {
  const element = document.createElement("form");
  element.innerHTML = html;
  return element;
}

describe("parseLoginForm", () => {
  it("parsuje i normalizuje poprawne dane", () => {
    expect(
      parseLoginForm(
        form(`
          <input name="email" value=" ala@example.com ">
          <input name="password" value=" secret123 ">
          <input name="remember" type="checkbox" checked>
        `),
      ),
    ).toEqual({
      ok: true,
      value: {
        email: "ala@example.com",
        password: "secret123",
        remember: true,
      },
    });
  });

  it("zbiera błędy i obsługuje niezaznaczony checkbox", () => {
    expect(
      parseLoginForm(
        form(`
          <input name="email" value="wrong">
          <input name="password" value="short">
          <input name="remember" type="checkbox">
        `),
      ),
    ).toEqual({ ok: false, errors: ["email", "password"] });
  });

  it("brak pól jest kontrolowanym błędem", () => {
    expect(parseLoginForm(form(""))).toEqual({
      ok: false,
      errors: ["email", "password"],
    });
  });
});
