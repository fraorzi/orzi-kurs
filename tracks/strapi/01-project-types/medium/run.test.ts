import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Wyprowadź publiczny kontrakt pól", () => {
  it("spełnia kontrakt Strapi 5", async () => {
    expect(solve({ title: { type: "string" }, secret: { type: "string", private: true }, password: { type: "password" } })).toEqual(["title"]);
  });
});

