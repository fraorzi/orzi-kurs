import { describe, expect, it, vi } from "vitest";
import {
  act,
  renderWithUser,
  screen,
  waitFor,
} from "@harness/react-test";
import {
  ReportPanel,
  type Report,
} from "./starter";

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });
  return { promise, reject, resolve };
}

describe("ReportPanel", () => {
  it("przechodzi z błędu przez retry do nowego raportu", async () => {
    const first = deferred<Report>();
    const second = deferred<Report>();
    const loadReport = vi
      .fn<() => Promise<Report>>()
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise);
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    try {
      const { rerender, user } = renderWithUser(
        <ReportPanel loadReport={loadReport} />,
      );
      expect(screen.getByRole("status")).toHaveTextContent(
        "Ładowanie raportu…",
      );

      await act(async () => {
        first.reject(new Error("offline"));
        await first.promise.catch(() => {});
        rerender(<ReportPanel loadReport={loadReport} />);
      });
      await waitFor(() => {
        expect(screen.getByRole("alert")).toHaveTextContent(
          "Nie udało się wczytać raportu.",
        );
      });

      await user.click(
        screen.getByRole("button", { name: "Spróbuj ponownie" }),
      );
      expect(loadReport).toHaveBeenCalledTimes(2);
      await waitFor(() => {
        expect(screen.getByRole("status")).toHaveTextContent(
          "Ładowanie raportu…",
        );
      });

      await act(async () => {
        second.resolve({ title: "Raport kwartalny" });
        await second.promise;
        rerender(<ReportPanel loadReport={loadReport} />);
      });
      await waitFor(() => {
        expect(screen.getByRole("heading", {
          name: "Raport kwartalny",
        })).toBeInTheDocument();
      });
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    } finally {
      consoleError.mockRestore();
    }
  });
});
