import { describe, expect, it } from "vitest";
import {
  render,
  screen,
} from "@harness/react-test";
import {
  UserResult,
  type UserViewState,
} from "./starter";

describe("UserResult", () => {
  it("renderuje każdy jawny stan widoku", () => {
    const { rerender } = render(<UserResult state={{ status: "idle" }} />);
    expect(screen.getByText("Wybierz użytkownika.")).toBeInTheDocument();

    rerender(<UserResult state={{ status: "pending" }} />);
    expect(screen.getByRole("status")).toHaveTextContent("Ładowanie…");

    rerender(<UserResult state={{ status: "empty" }} />);
    expect(screen.getByText("Brak użytkownika.")).toBeInTheDocument();

    rerender(
      <UserResult
        state={{
          status: "success",
          user: { id: "u1", name: "Ada" },
        }}
      />,
    );
    expect(screen.getByRole("heading", { name: "Ada" })).toBeInTheDocument();

    rerender(
      <UserResult state={{ status: "error", message: "Brak sieci" }} />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Brak sieci");
  });

  it("nie dopuszcza sprzecznych kształtów compile-time", () => {
    const illegalSuccess = (): UserViewState => ({
      status: "success",
      user: { id: "u1", name: "Ada" },
      // @ts-expect-error sukces nie ma komunikatu błędu
      message: "boom",
    });
    const illegalError = (): UserViewState => (
      // @ts-expect-error error wymaga message
      { status: "error" }
    );

    expect(illegalSuccess).toBeTypeOf("function");
    expect(illegalError).toBeTypeOf("function");
  });
});
