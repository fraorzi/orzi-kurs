import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { DeleteAccountDialog } from "./starter";

describe("DeleteAccountDialog", () => {
  it("utrzymuje focus w modalu i przywraca go po Escape", async () => {
    const { user } = renderWithUser(
      <DeleteAccountDialog onConfirm={vi.fn()} />,
    );
    const trigger = screen.getByRole("button", {
      name: "Usuń konto",
    });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", {
      name: "Usuń konto?",
    });

    const cancel = screen.getByRole("button", {
      name: "Anuluj",
    });
    const confirm = screen.getByRole("button", {
      name: "Potwierdź usunięcie",
    });
    expect(cancel).toHaveFocus();

    await user.tab();
    expect(confirm).toHaveFocus();
    await user.tab();
    expect(cancel).toHaveFocus();
    await user.tab({ shift: true });
    expect(confirm).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("dialog"),
    ).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("potwierdza operację i przywraca focus do triggera", async () => {
    const onConfirm = vi.fn();
    const { user } = renderWithUser(
      <DeleteAccountDialog onConfirm={onConfirm} />,
    );
    const trigger = screen.getByRole("button", {
      name: "Usuń konto",
    });
    await user.click(trigger);
    await user.click(
      screen.getByRole("button", {
        name: "Potwierdź usunięcie",
      }),
    );

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByRole("dialog"),
    ).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
