import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { ToggleDetails } from "./starter";

describe("ToggleDetails", () => {
  it("pokazuje i ponownie ukrywa szczegóły", async () => {
    const { user } = renderWithUser(
      <ToggleDetails details="Dostawa zajmuje dwa dni." />,
    );

    expect(screen.queryByText("Dostawa zajmuje dwa dni."))
      .not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Pokaż szczegóły" }));
    expect(screen.getByText("Dostawa zajmuje dwa dni.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Ukryj szczegóły" }));
    expect(screen.queryByText("Dostawa zajmuje dwa dni."))
      .not.toBeInTheDocument();
  });
});
