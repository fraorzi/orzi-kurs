import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Zdefiniuj jawną trasę custom", () => {
  it("spełnia kontrakt warstwy backendowej", async () => {
    expect(solve()).toEqual({ method: "PUT", path: "/articles/:documentId/publish", handler: "article.publish", config: { auth: true, policies: ["api::article.can-publish"] } });
  });
});

