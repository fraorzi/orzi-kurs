import { describe, expect, it, vi } from "vitest";
import {
  render,
  screen,
} from "@harness/react-test";
import { LoginForm } from "./fixture";

describe("LoginForm", () => {
  it("wysyła formularz", () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    screen.getByText("Zaloguj").click();

    expect(onSubmit).toHaveBeenCalled();
  });
});
