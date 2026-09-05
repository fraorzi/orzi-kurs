import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
  waitFor,
} from "@harness/react-test";
import { LikeButton } from "./starter";

function deferred<T>() {
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((_resolve, onReject) => {
    reject = onReject;
  });
  return { promise, reject };
}

describe("LikeButton", () => {
  it("aktualizuje natychmiast i wycofuje zmianę po błędzie", async () => {
    const operation = deferred<boolean>();
    const saveLike = vi.fn(() => operation.promise);
    const { user } = renderWithUser(
      <LikeButton
        initialLiked={false}
        saveLike={saveLike}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Polub" }),
    );
    expect(saveLike).toHaveBeenCalledWith(true);
    expect(
      screen.getByRole("button", {
        name: "Cofnij polubienie",
      }),
    ).toBeVisible();

    await act(async () => {
      operation.reject(new Error("offline"));
      await operation.promise.catch(() => {});
    });
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Polub" }),
      ).toBeVisible();
    });
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Nie udało się zapisać polubienia.",
    );
  });
});
