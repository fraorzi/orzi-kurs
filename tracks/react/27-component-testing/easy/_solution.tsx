import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { LoginForm } from "./fixture";

describe("LoginForm", () => {
  it("wysyła dane wpisane przez użytkownika", async () => {
    const onSubmit = vi.fn();
    const { user } = renderWithUser(<LoginForm onSubmit={onSubmit} />);

    await user.type(
      screen.getByRole("textbox", { name: "E-mail" }),
      "dev@example.com",
    );
    await user.type(
      screen.getByLabelText("Hasło"),
      "sekret123",
    );
    await user.click(screen.getByRole("button", { name: "Zaloguj" }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: "dev@example.com",
      password: "sekret123",
    });
  });
});
