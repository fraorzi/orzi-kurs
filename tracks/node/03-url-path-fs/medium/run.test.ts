import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Zatrzymaj path traversal", () => {
  it("spełnia kontrakt zadania", async () => {
    await expect(solve("/srv/uploads", "team/avatar.png")).resolves.toBe(
      "/srv/uploads/team/avatar.png",
    );
    await expect(solve("/srv/uploads", "../secret")).rejects.toThrow(/rootem/);
    await expect(solve("/srv/app", "../application/x")).rejects.toThrow();
  });
});
