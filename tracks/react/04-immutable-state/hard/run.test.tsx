import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
  within,
} from "@harness/react-test";
import {
  SprintBoard,
  type SprintBoardState,
} from "./starter";

describe("SprintBoard", () => {
  it("przenosi zadanie bez mutowania zamrożonych propsów", async () => {
    const initialBoard: SprintBoardState = {
      backlog: [
        { id: "payments", title: "Płatności" },
        { id: "search", title: "Wyszukiwarka" },
      ],
      inProgress: [{ id: "auth", title: "Logowanie" }],
    };
    Object.freeze(initialBoard.backlog);
    Object.freeze(initialBoard.inProgress);
    Object.freeze(initialBoard);

    const { user } = renderWithUser(
      <SprintBoard initialBoard={initialBoard} />,
    );
    await user.click(
      screen.getByRole("button", { name: "Rozpocznij Płatności" }),
    );

    expect(within(screen.getByRole("region", { name: "Backlog" }))
      .queryByText("Płatności")).not.toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: "W toku" }))
      .getByText("Płatności")).toBeInTheDocument();
    expect(initialBoard).toEqual({
      backlog: [
        { id: "payments", title: "Płatności" },
        { id: "search", title: "Wyszukiwarka" },
      ],
      inProgress: [{ id: "auth", title: "Logowanie" }],
    });
  });
});
