import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Odczytaj płaską odpowiedź REST v5", () => {
  it("spełnia kontrakt Strapi 5", async () => {
    expect(solve({ data: [{ documentId: "doc", title: "Nowy kontrakt" }] })).toEqual(["Nowy kontrakt"]);
  });
});

