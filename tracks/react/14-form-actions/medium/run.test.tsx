import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
} from "@harness/react-test";
import { CreateProjectForm } from "./starter";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe("CreateProjectForm", () => {
  it("waliduje, pokazuje pending i renderuje wynik Action", async () => {
    const operation = deferred<string>();
    const createProject = vi.fn(() => operation.promise);
    const { user } = renderWithUser(
      <CreateProjectForm createProject={createProject} />,
    );
    const input = screen.getByRole("textbox", { name: "Nazwa projektu" });

    await user.type(input, " x ");
    await user.click(screen.getByRole("button", { name: "Utwórz projekt" }));
    expect(createProject).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Nazwa musi mieć co najmniej 3 znaki.",
    );

    await user.clear(input);
    await user.type(input, "  Panel klienta  ");
    await user.click(screen.getByRole("button", { name: "Utwórz projekt" }));
    expect(createProject).toHaveBeenCalledWith("Panel klienta");
    expect(screen.getByRole("button", { name: "Tworzenie…" }))
      .toBeDisabled();

    await act(async () => {
      operation.resolve("prj_42");
      await operation.promise;
    });
    expect(screen.getByRole("status")).toHaveTextContent(
      "Utworzono projekt prj_42",
    );
  });
});
