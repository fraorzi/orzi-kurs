import { describe, expect, it } from "vitest";
import {
  render,
  screen,
} from "@harness/react-test";
import {
  AccountButton,
  SessionProvider,
} from "./starter";

describe("SessionProvider", () => {
  it("udostępnia sesję przez bezpieczny custom hook", () => {
    render(
      <SessionProvider session={{ userId: "u1", displayName: "Ada" }}>
        <AccountButton />
      </SessionProvider>,
    );

    expect(screen.getByRole("button", { name: "Konto: Ada" }))
      .toBeInTheDocument();
  });

  it("zgłasza czytelny błąd poza providerem", () => {
    expect(() => render(<AccountButton />)).toThrow(
      "useSession wymaga SessionProvider",
    );
  });
});
