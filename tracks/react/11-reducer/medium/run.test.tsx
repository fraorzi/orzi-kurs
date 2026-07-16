import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
} from "@harness/react-test";
import {
  TaskBoard,
  type Task,
} from "./starter";

const INITIAL_TASKS: readonly Task[] = [
  { id: "test", title: "Dodać testy", done: false },
];

describe("TaskBoard", () => {
  it("dodaje, przełącza i usuwa zadania bez mutacji", async () => {
    const createId = vi.fn(() => "review");
    const { user } = renderWithUser(
      <TaskBoard initialTasks={INITIAL_TASKS} createId={createId} />,
    );

    await user.type(
      screen.getByRole("textbox", { name: "Nowe zadanie" }),
      "  Zrobić review  ",
    );
    await user.click(screen.getByRole("button", { name: "Dodaj" }));
    expect(screen.getByText("Zrobić review")).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox", { name: "Dodać testy" }));
    expect(screen.getByRole("checkbox", { name: "Dodać testy" }))
      .toBeChecked();

    await user.click(
      screen.getByRole("button", { name: "Usuń Dodać testy" }),
    );
    expect(screen.queryByText("Dodać testy")).not.toBeInTheDocument();
    expect(INITIAL_TASKS).toEqual([
      { id: "test", title: "Dodać testy", done: false },
    ]);
  });
});
