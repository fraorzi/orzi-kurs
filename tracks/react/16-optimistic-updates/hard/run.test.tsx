import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
  waitFor,
} from "@harness/react-test";
import {
  OptimisticComments,
  type Comment,
} from "./starter";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe("OptimisticComments", () => {
  it("rebazuje pending komentarz na świeższej liście z propsów", async () => {
    const operation = deferred<Comment>();
    const saveComment = vi.fn(() => operation.promise);

    function Fixture() {
      const [comments, setComments] = useState<readonly Comment[]>([
        { id: "c1", text: "Pierwszy" },
      ]);

      return (
        <>
          <OptimisticComments
            comments={comments}
            saveComment={saveComment}
            commitComment={(comment) => {
              setComments((current) => [...current, comment]);
            }}
          />
          <button
            type="button"
            onClick={() => {
              setComments((current) => [
                ...current,
                { id: "c2", text: "Komentarz zespołu" },
              ]);
            }}
          >
            Symuluj komentarz zespołu
          </button>
        </>
      );
    }

    const { user } = renderWithUser(<Fixture />);
    await user.type(
      screen.getByRole("textbox", { name: "Komentarz" }),
      "Mój komentarz",
    );
    await user.click(
      screen.getByRole("button", { name: "Dodaj komentarz" }),
    );
    expect(screen.getByText("Mój komentarz (wysyłanie…)"))
      .toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Symuluj komentarz zespołu" }),
    );
    expect(screen.getByText("Komentarz zespołu")).toBeInTheDocument();
    expect(screen.getByText("Mój komentarz (wysyłanie…)"))
      .toBeInTheDocument();

    await act(async () => {
      operation.resolve({ id: "c3", text: "Mój komentarz" });
      await operation.promise;
    });
    await waitFor(() => {
      expect(screen.getByText("Mój komentarz")).toBeInTheDocument();
    });
    expect(screen.queryByText("Mój komentarz (wysyłanie…)"))
      .not.toBeInTheDocument();
    expect(screen.getByText("Komentarz zespołu")).toBeInTheDocument();
  });
});
