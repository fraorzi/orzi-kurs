import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
} from "@harness/react-test";
import { SaveSettings } from "./starter";

describe("SaveSettings", () => {
  it("ogłasza pending i sukces bez przeniesienia focusu", async () => {
    let resolveSave = () => {};
    const save = vi.fn(() => new Promise<void>((resolve) => {
      resolveSave = resolve;
    }));
    const { user } = renderWithUser(<SaveSettings save={save} />);

    await user.click(screen.getByRole("button", { name: "Zapisz ustawienia" }));

    const button = screen.getByRole("button", { name: "Zapisywanie…" });
    expect(button).toBeDisabled();
    expect(button).toHaveFocus();

    await act(async () => resolveSave());

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Ustawienia zapisane",
    );
    expect(screen.getByRole("button", { name: "Zapisz ustawienia" }))
      .toHaveFocus();
  });

  it("ogłasza błąd jako alert", async () => {
    const { user } = renderWithUser(
      <SaveSettings save={vi.fn().mockRejectedValue(new Error("offline"))} />,
    );

    await user.click(screen.getByRole("button", { name: "Zapisz ustawienia" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Nie udało się zapisać",
    );
  });
});
