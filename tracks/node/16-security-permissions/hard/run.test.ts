import { describe, expect, it, vi } from "vitest";
import { solve } from "./starter";
describe("Redaguj zagnieżdżone logi", () => {
  it("spełnia kontrakt zadania", async () => {
    expect(
      solve({ user: { password: "abc", roles: [1, 2, 3] } }, 3, 2),
    ).toEqual({
      user: { password: "[REDACTED]", roles: [1, 2, "[TRUNCATED]"] },
    });
    expect(JSON.stringify(solve({ authorization: "Bearer x" }))).not.toContain(
      "Bearer",
    );
  });
});
