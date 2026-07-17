import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
  waitFor,
} from "@harness/react-test";
import { SearchActionForm } from "./starter";

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe("SearchActionForm", () => {
  it("przekazuje przyciętą frazę i resetuje pole po sukcesie", async () => {
    const operation = deferred();
    const search = vi.fn(() => operation.promise);
    const { user } = renderWithUser(<SearchActionForm search={search} />);
    const input = screen.getByRole("textbox", { name: "Fraza" });

    await user.type(input, "  react actions  ");
    await user.click(screen.getByRole("button", { name: "Szukaj" }));

    expect(search).toHaveBeenCalledWith("react actions");
    expect(input).toHaveValue("  react actions  ");

    await act(async () => {
      operation.resolve();
      await operation.promise;
    });
    await waitFor(() => expect(input).toHaveValue(""));
  });

  it("pomija pustą frazę", async () => {
    const search = vi.fn(async () => {});
    const { user } = renderWithUser(<SearchActionForm search={search} />);

    await user.type(screen.getByRole("textbox", { name: "Fraza" }), "   ");
    await user.click(screen.getByRole("button", { name: "Szukaj" }));

    expect(search).not.toHaveBeenCalled();
  });
});
