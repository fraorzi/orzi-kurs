import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import {
  EditableTaskList,
  type EditableTask,
} from "./starter";

const TASKS: readonly EditableTask[] = [
  { id: "a", title: "Analiza" },
  { id: "b", title: "Testy" },
];

describe("EditableTaskList", () => {
  it("renderuje input dla każdego rekordu", () => {
    renderWithUser(<EditableTaskList tasks={TASKS} />);

    expect(screen.getByRole("textbox", { name: "Nazwa zadania a" }))
      .toHaveValue("Analiza");
    expect(screen.getByRole("textbox", { name: "Nazwa zadania b" }))
      .toHaveValue("Testy");
  });

  it("po zmianie kolejności zachowuje edycję przy właściwym id", async () => {
    const { rerender, user } = renderWithUser(
      <EditableTaskList tasks={TASKS} />,
    );
    const firstTask = screen.getByRole("textbox", {
      name: "Nazwa zadania a",
    });
    await user.clear(firstTask);
    await user.type(firstTask, "Analiza API");

    rerender(<EditableTaskList tasks={[...TASKS].reverse()} />);

    expect(screen.getByRole("textbox", { name: "Nazwa zadania a" }))
      .toHaveValue("Analiza API");
    expect(screen.getByRole("textbox", { name: "Nazwa zadania b" }))
      .toHaveValue("Testy");
  });
});
