import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("definiowanie jawnej trasy custom", () => {
  it("zwraca pełny descriptor trasy publikacji", () => {
    expect(solve()).toEqual({
      method: "PUT",
      path: "/articles/:documentId/publish",
      handler: "article.publish",
      config: { auth: true, policies: ["api::article.can-publish"] },
    });
  });

  it("nie zostawia trasy dostępnej dla public bez jawnej zgody", () => {
    expect(solve().config.auth).toBe(true);
  });

  it("wskazuje dokładnie jedną policy zgodną z konwencją UID", () => {
    expect(solve().config.policies).toEqual(["api::article.can-publish"]);
  });

  it("nie współdzieli tej samej referencji policies między wywołaniami", () => {
    const first = solve();
    const second = solve();
    expect(first.config.policies).not.toBe(second.config.policies);
    expect(first).not.toBe(second);
  });
});
