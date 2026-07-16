import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { UserSearch } from "./fixture";

describe("UserSearch", () => {
  it("pokazuje wynik", async () => {
    const searchUsers = vi.fn().mockResolvedValue(["Anna"]);
    const { user } = renderWithUser(<UserSearch searchUsers={searchUsers} />);

    await user.click(screen.getByRole("button", { name: "Szukaj" }));

    expect(screen.getByText("Anna")).toBeInTheDocument();
  });
});
