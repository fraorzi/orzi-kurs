import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Koreluj odpowiedzi workera", () => {
  it("spełnia kontrakt zadania", async () => {
    const manager = solve(1);
    let id = 0;
    const pending = manager.request<number>((message) => {
      id = message.id;
    });
    await expect(manager.request(() => undefined)).rejects.toThrow(
      /przeciążona/,
    );
    manager.resolve(id, 42);
    await expect(pending).resolves.toBe(42);
    const failed = manager.request(() => undefined);
    manager.fail(new Error("worker exited"));
    await expect(failed).rejects.toThrow(/exited/);
  });
});
