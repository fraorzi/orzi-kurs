import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import { ScoreBoard } from "./starter";

describe("ScoreBoard", () => {
  it("aktualizuje oba pola bez gubienia drugiego wyniku", async () => {
    const { user } = renderWithUser(<ScoreBoard />);
    const home = screen.getByRole("status", { name: "Gospodarze" });
    const away = screen.getByRole("status", { name: "Goście" });

    await user.click(
      screen.getByRole("button", { name: "Punkt dla gospodarzy" }),
    );
    await user.click(
      screen.getByRole("button", { name: "Punkt dla gospodarzy" }),
    );
    await user.click(screen.getByRole("button", { name: "Punkt dla gości" }));

    expect(home).toHaveTextContent("2");
    expect(away).toHaveTextContent("1");
  });
});
