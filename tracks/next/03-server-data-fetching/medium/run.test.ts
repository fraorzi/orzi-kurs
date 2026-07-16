import { describe, expect, it } from "vitest";
import { loadDashboard } from "./src/dashboard-data";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe("loadDashboard", () => {
  it("rozpoczyna oba niezależne zapytania przed oczekiwaniem", async () => {
    const events: string[] = [];
    const summary = deferred<{ revenue: number; orders: number }>();
    const alerts = deferred<readonly { id: string; message: string }[]>();

    const resultPromise = loadDashboard(
      () => {
        events.push("summary:start");
        return summary.promise;
      },
      () => {
        events.push("alerts:start");
        return alerts.promise;
      },
    );

    expect(events).toEqual(["summary:start", "alerts:start"]);

    alerts.resolve([{ id: "a-1", message: "Niski stan" }]);
    summary.resolve({ revenue: 4200, orders: 12 });

    await expect(resultPromise).resolves.toEqual({
      summary: { revenue: 4200, orders: 12 },
      alerts: [{ id: "a-1", message: "Niski stan" }],
    });
  });
});
