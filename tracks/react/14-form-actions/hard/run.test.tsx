import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
  waitFor,
} from "@harness/react-test";
import { SeatReservationCounter } from "./starter";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe("SeatReservationCounter", () => {
  it("kolejkuje zależne Actions na poprzednim wyniku", async () => {
    const first = deferred<number>();
    const second = deferred<number>();
    const saveCount = vi
      .fn<(nextCount: number) => Promise<number>>()
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise);
    const { user } = renderWithUser(
      <SeatReservationCounter initialCount={0} saveCount={saveCount} />,
    );
    const submit = screen.getByRole("button", { name: "Dodaj miejsce" });

    await user.click(submit);
    await user.click(submit);
    expect(saveCount).toHaveBeenCalledTimes(1);
    expect(saveCount).toHaveBeenNthCalledWith(1, 1);
    expect(screen.getByText("Aktualizowanie…")).toBeInTheDocument();

    await act(async () => {
      first.resolve(10);
      await first.promise;
    });
    await waitFor(() => expect(saveCount).toHaveBeenCalledTimes(2));
    expect(saveCount).toHaveBeenNthCalledWith(2, 11);

    await act(async () => {
      second.resolve(11);
      await second.promise;
    });
    await waitFor(() => {
      expect(screen.getByLabelText("Liczba miejsc")).toHaveTextContent("11");
    });
    expect(screen.queryByText("Aktualizowanie…")).not.toBeInTheDocument();
  });
});
