import { describe, expect, it, vi } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { withRetry } from "./starter";

describe("withRetry", () => {
  it("zachowuje sygnaturę argumentów i wyniku", async () => {
    const load = async (id: number, includeDrafts: boolean): Promise<string> =>
      `${id}:${includeDrafts}`;
    const retried = withRetry(load, { maxAttempts: 2 });
    type _retried = Expect<
      Equal<typeof retried, (id: number, includeDrafts: boolean) => Promise<string>>
    >;
    await expect(retried(7, true)).resolves.toBe("7:true");
  });

  it("ponawia do sukcesu i przekazuje argumenty", async () => {
    const operation = vi
      .fn<(key: string) => Promise<number>>()
      .mockRejectedValueOnce(new Error("temporary"))
      .mockResolvedValueOnce(42);
    const retried = withRetry(operation, { maxAttempts: 3 });
    await expect(retried("answer")).resolves.toBe(42);
    expect(operation).toHaveBeenNthCalledWith(1, "answer");
    expect(operation).toHaveBeenNthCalledWith(2, "answer");
  });

  it("przekazuje numer nieudanej próby do shouldRetry", async () => {
    const error = new Error("stop");
    const shouldRetry = vi.fn(() => false);
    const retried = withRetry(async () => {
      throw error;
    }, { maxAttempts: 5, shouldRetry });

    await expect(retried()).rejects.toBe(error);
    expect(shouldRetry).toHaveBeenCalledWith(error, 1);
  });

  it("po ostatniej próbie rzuca ostatni błąd", async () => {
    const first = new Error("first");
    const last = new Error("last");
    const operation = vi
      .fn<() => Promise<never>>()
      .mockRejectedValueOnce(first)
      .mockRejectedValueOnce(last);
    await expect(
      withRetry(operation, { maxAttempts: 2 })(),
    ).rejects.toBe(last);
  });

  it.each([0, -1, 1.5])("odrzuca maxAttempts=%s", (maxAttempts) => {
    expect(() =>
      withRetry(async () => true, { maxAttempts }),
    ).toThrow(RangeError);
  });
});
