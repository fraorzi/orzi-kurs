import { describe, expect, it } from "vitest";
import {
  render,
  screen,
  within,
} from "@harness/react-test";
import { Card } from "./starter";

describe("Card", () => {
  it("renderuje niezależne sloty treści i akcji", () => {
    render(
      <Card
        title="Projekt Atlas"
        actions={<button type="button">Archiwizuj</button>}
      >
        <p>Ostatnia aktualizacja: dziś</p>
      </Card>,
    );

    const card = screen.getByRole("region", { name: "Projekt Atlas" });
    expect(within(card).getByText("Ostatnia aktualizacja: dziś"))
      .toBeInTheDocument();
    const action = within(card).getByRole("button", { name: "Archiwizuj" });
    expect(action.closest("footer")).not.toBeNull();
    expect(within(card).queryByText("Stała zawartość"))
      .not.toBeInTheDocument();
  });
});
