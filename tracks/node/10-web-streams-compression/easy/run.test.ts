import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";

function streamOf(parts: readonly string[]): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      for (const part of parts) controller.enqueue(Buffer.from(part));
      controller.close();
    },
  });
}

describe("zbieranie Web ReadableStream", () => {
  it("skleja chunki w jeden Uint8Array", async () => {
    const bytes = await solve(streamOf(["ala ", "ma ", "kota"]), 1024);
    expect(Buffer.from(bytes).toString()).toBe("ala ma kota");
  });

  it("rozmiar równy limitowi przechodzi", async () => {
    const bytes = await solve(streamOf(["abc"]), 3);
    expect(bytes.byteLength).toBe(3);
  });

  it("po przekroczeniu limitu anuluje źródło i rzuca", async () => {
    const cancel = vi.fn();
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(Buffer.from("za dużo bajtów"));
      },
      cancel,
    });
    await expect(solve(stream, 5)).rejects.toThrow();
    expect(cancel).toHaveBeenCalledTimes(1);
  });

  it("zwalnia lock niezależnie od ścieżki", async () => {
    const good = streamOf(["ok"]);
    await solve(good, 10);
    expect(good.locked).toBe(false);
  });
});
