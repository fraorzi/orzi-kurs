import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
} from "@harness/react-test";
import { UserSearch } from "./fixture";

describe("UserSearch", () => {
  it("pokazuje pending, a potem wynik", async () => {
    let resolveSearch: (users: readonly string[]) => void = () => {};
    const searchUsers = vi.fn(
      () => new Promise<readonly string[]>((resolve) => {
        resolveSearch = resolve;
      }),
    );
    const { user } = renderWithUser(<UserSearch searchUsers={searchUsers} />);

    await user.type(
      screen.getByRole("textbox", { name: "Użytkownik" }),
      "ann",
    );
    await user.click(screen.getByRole("button", { name: "Szukaj" }));
    expect(screen.getByRole("status")).toHaveTextContent("Wyszukiwanie…");

    await act(async () => resolveSearch(["Anna"]));

    expect(
      await screen.findByRole("list", { name: "Wyniki" }),
    ).toHaveTextContent("Anna");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("pokazuje błąd odrzuconego wyszukiwania", async () => {
    const searchUsers = vi.fn().mockRejectedValue(new Error("offline"));
    const { user } = renderWithUser(<UserSearch searchUsers={searchUsers} />);

    await user.click(screen.getByRole("button", { name: "Szukaj" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Nie udało się wyszukać",
    );
  });
});
