import { describe, expect, it, vi } from "vitest";
import { streamReport, type ReportRow } from "./starter";

describe("streamReport", () => {
  it("zwraca prawdziwe 404 przed otwarciem wierszy", async () => {
    const openRows = vi.fn(() => ({
      async *[Symbol.asyncIterator]() { yield { id: "x", total: 1 }; },
    }));
    const response = await streamReport("missing", async () => null, openRows);
    expect(response.status).toBe(404);
    expect(openRows).not.toHaveBeenCalled();
  });

  it("zwraca odpowiedź zanim źródło dostarczy pierwszy wiersz", async () => {
    let release!: () => void;
    const blocked = new Promise<void>((resolve) => { release = resolve; });
    const pending = streamReport(
      "r-1",
      async () => ({ filename: 'sales".csv' }),
      () => ({
        async *[Symbol.asyncIterator]() {
          await blocked;
          yield { id: "o-1", total: 49 };
        },
      }),
    );
    const outcome = await Promise.race([
      pending.then(() => "response" as const),
      new Promise<"blocked">((resolve) => setTimeout(() => resolve("blocked"), 20)),
    ]);
    release();
    const response = await pending;
    expect(outcome).toBe("response");
    expect(response.headers.get("content-type")).toBe("text/csv; charset=utf-8");
    expect(response.headers.get("content-disposition"))
      .toBe('attachment; filename="sales.csv"');
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("x-accel-buffering")).toBe("no");
    await expect(response.text()).resolves.toBe("id,total\no-1,49\n");
  });

  it("zamyka iterator po anulowaniu czytnika", async () => {
    const close = vi.fn(async () => ({ done: true as const, value: undefined }));
    const source: AsyncIterable<ReportRow> = {
      [Symbol.asyncIterator]() {
        return {
          next: vi.fn(async () => new Promise<IteratorResult<ReportRow>>((resolve) => {
            setTimeout(() => resolve({ done: true, value: undefined }), 30);
          })),
          return: close,
        };
      },
    };
    const response = await streamReport("r-1", async () => ({ filename: "r.csv" }), () => source);
    const reader = response.body!.getReader();
    await reader.read();
    await reader.cancel();
    expect(close).toHaveBeenCalledOnce();
  });
});
