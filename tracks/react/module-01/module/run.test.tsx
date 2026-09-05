import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import {
  render,
  renderWithUser,
  screen,
  within,
} from "@harness/react-test";
import { TaskBoard, type TeamTask } from "./src/index";

const INITIAL_TASKS: readonly TeamTask[] = [
  { id: "tests", title: "Dodać testy", done: false },
  { id: "docs", title: "Opisać feature", done: true },
];

describe("TaskBoard", () => {
  it("składa feature i pokazuje dane pochodne", () => {
    render(
      <TaskBoard
        initialTasks={INITIAL_TASKS}
        createId={() => "new"}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Tablica zespołu",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", {
        name: "Otwarte zadania",
      }),
    ).toHaveTextContent("1");
    expect(
      screen.getByRole("status", {
        name: "Gotowe zadania",
      }),
    ).toHaveTextContent("1");
  });

  it("dodaje znormalizowane zadanie i nie dodaje pustego", async () => {
    const createId = vi.fn(() => "review");
    const { user } = renderWithUser(
      <TaskBoard
        initialTasks={INITIAL_TASKS}
        createId={createId}
      />,
    );
    const input = screen.getByRole("textbox", {
      name: "Nowe zadanie",
    });

    await user.type(input, "   ");
    await user.click(
      screen.getByRole("button", { name: "Dodaj" }),
    );
    expect(createId).not.toHaveBeenCalled();

    await user.clear(input);
    await user.type(input, "  Zrobić review  ");
    await user.click(
      screen.getByRole("button", { name: "Dodaj" }),
    );

    expect(createId).toHaveBeenCalledOnce();
    expect(
      screen.getByText("Zrobić review"),
    ).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(
      screen.getByRole("status", {
        name: "Otwarte zadania",
      }),
    ).toHaveTextContent("2");
  });

  it("filtruje, przełącza i usuwa bez mutowania danych wejściowych", async () => {
    const initialTasks: TeamTask[] = [
      { id: "tests", title: "Dodać testy", done: false },
      { id: "docs", title: "Opisać feature", done: true },
    ];
    Object.freeze(initialTasks);
    const { user } = renderWithUser(
      <TaskBoard
        initialTasks={initialTasks}
        createId={() => "new"}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Otwarte" }),
    );
    const list = screen.getByRole("list", {
      name: "Zadania",
    });
    expect(
      within(list).getByText("Dodać testy"),
    ).toBeInTheDocument();
    expect(
      within(list).queryByText("Opisać feature"),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("checkbox", { name: "Dodać testy" }),
    );
    expect(
      screen.getByText("Brak zadań dla tego filtra."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", {
        name: "Otwarte zadania",
      }),
    ).toHaveTextContent("0");
    expect(
      screen.getByRole("status", {
        name: "Gotowe zadania",
      }),
    ).toHaveTextContent("2");

    await user.click(
      screen.getByRole("button", { name: "Gotowe" }),
    );
    await user.click(
      screen.getByRole("button", {
        name: "Usuń Dodać testy",
      }),
    );
    expect(
      screen.queryByText("Dodać testy"),
    ).not.toBeInTheDocument();
    expect(initialTasks).toEqual([
      { id: "tests", title: "Dodać testy", done: false },
      { id: "docs", title: "Opisać feature", done: true },
    ]);
  });

  it("utrzymuje osobne contexty state i dispatch", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "tracks/react/module-01/module/src/context.tsx",
      ),
      "utf8",
    );

    expect(source.match(/createContext</g)).toHaveLength(2);
    expect(source).toContain(
      "<TaskStateContext value={state}>",
    );
    expect(source).toContain(
      "<TaskDispatchContext value={dispatch}>",
    );
  });
});
