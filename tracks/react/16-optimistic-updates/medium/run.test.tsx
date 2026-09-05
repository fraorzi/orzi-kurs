import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
  waitFor,
} from "@harness/react-test";
import { FollowCard } from "./starter";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe("FollowCard", () => {
  it("zmienia spójnie status i licznik, a potem przyjmuje wynik serwera", async () => {
    const operation = deferred<{
      isFollowing: boolean;
      followerCount: number;
    }>();
    const saveFollow = vi.fn(() => operation.promise);
    const { user } = renderWithUser(
      <FollowCard
        initialState={{
          isFollowing: false,
          followerCount: 10,
        }}
        saveFollow={saveFollow}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Obserwuj" }),
    );
    expect(
      screen.getByText("11 obserwujących"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Przestań obserwować",
      }),
    ).toBeInTheDocument();

    await act(async () => {
      operation.resolve({
        isFollowing: true,
        followerCount: 12,
      });
      await operation.promise;
    });
    await waitFor(() => {
      expect(
        screen.getByText("12 obserwujących"),
      ).toBeInTheDocument();
    });
  });
});
