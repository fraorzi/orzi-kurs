import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Zastosuj permissions jako allow-list", () => {
  it("spełnia kontrakt warstwy backendowej", async () => {
    const permissions = { editor: ["api::article.article.find", "api::article.article.update"] };
    expect(solve(permissions, "editor", "api::article.article.update")).toBe(true);
    expect(solve(permissions, "editor", "api::article.article.delete")).toBe(false);
  });
});

