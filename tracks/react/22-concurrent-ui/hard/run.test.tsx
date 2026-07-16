import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
  waitFor,
} from "@harness/react-test";
import { WorkspaceTabs } from "./starter";

describe("WorkspaceTabs", () => {
  it("zachowuje draft, ale zatrzymuje Effect ukrytego Activity", async () => {
    const cleanup = vi.fn();
    const subscribe = vi.fn(() => cleanup);
    const { user } = renderWithUser(<WorkspaceTabs subscribe={subscribe} />);

    const draft = screen.getByRole("textbox", { name: "Notatka robocza" });
    await user.type(draft, "Plan wydania 2.0");
    expect(subscribe).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Podgląd" }));

    expect(screen.getByText("Podgląd dokumentu")).toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", { name: "Notatka robocza" }),
    ).not.toBeInTheDocument();
    await waitFor(() => expect(cleanup).toHaveBeenCalledTimes(1));

    await user.click(screen.getByRole("button", { name: "Edycja" }));

    expect(
      screen.getByRole("textbox", { name: "Notatka robocza" }),
    ).toHaveValue("Plan wydania 2.0");
    await waitFor(() => expect(subscribe).toHaveBeenCalledTimes(2));
  });
});
