import { describe, expect, it, vi } from "vitest";
import {
  renderWithUser,
  screen,
  waitFor,
} from "@harness/react-test";
import { DelayedCounter } from "./starter";

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });

  return { promise, resolve };
}

describe("DelayedCounter", () => {
  it("nie gubi równoległych aktualizacji po await", async () => {
    const operations = [deferred(), deferred(), deferred()];
    let nextOperation = 0;
    const wait = vi.fn(() => operations[nextOperation++].promise);
    const { user } = renderWithUser(<DelayedCounter wait={wait} />);
    const button = screen.getByRole("button", {
      name: "Dodaj po zakończeniu",
    });

    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(wait).toHaveBeenCalledTimes(3);
    expect(screen.getByRole("status", { name: "Wynik" }))
      .toHaveTextContent("0");

    for (const operation of operations) {
      operation.resolve();
    }

    await waitFor(() => {
      expect(screen.getByRole("status", { name: "Wynik" }))
        .toHaveTextContent("3");
    });
  });
});
