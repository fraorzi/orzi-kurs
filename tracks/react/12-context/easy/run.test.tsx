import { describe, expect, it } from "vitest";
import {
  render,
  screen,
} from "@harness/react-test";
import {
  Greeting,
  LocaleProvider,
} from "./starter";

describe("LocaleProvider", () => {
  it("udostępnia i lokalnie nadpisuje wartość contextu", () => {
    render(
      <LocaleProvider locale="en">
        <section aria-label="English">
          <Greeting />
        </section>
        <LocaleProvider locale="pl">
          <section aria-label="Polski">
            <Greeting />
          </section>
        </LocaleProvider>
      </LocaleProvider>,
    );

    expect(screen.getByRole("region", { name: "English" }))
      .toHaveTextContent("Welcome!");
    expect(screen.getByRole("region", { name: "Polski" }))
      .toHaveTextContent("Witaj!");
  });
});
