import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("Ogranicz fields i populate", () => {
  it("zachowuje pola i status wymagane przez widok", () => {
    const query = solve();
    expect(query.status).toBe("published");
    expect(query.fields).toEqual(expect.arrayContaining(["title", "slug"]));
  });
  it("[quality] nie pobiera nadmiarowych pól ani populate wildcard", () => {
    const query = solve();
    expect(query.fields).toHaveLength(2);
    expect(query.populate).not.toBe("*");
  });
});

