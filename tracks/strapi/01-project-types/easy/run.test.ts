import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Rozpoznaj elementy UID content type", () => {
  it("spełnia kontrakt Strapi 5", async () => {
    expect(solve("api::article.article")).toEqual(["article", "article"]);
    expect(() => solve("plugin::users-permissions.user")).toThrow(/UID/);
  });
});

