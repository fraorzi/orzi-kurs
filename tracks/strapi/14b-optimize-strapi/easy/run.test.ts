import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("[O] zawężenie fields i populate", () => {
  it("zachowuje status i pola wymagane przez widok", () => {
    const query = solve();
    expect(query.status).toBe("published");
    expect(query.fields).toEqual(expect.arrayContaining(["title", "slug"]));
  });

  it("[quality] populate jest jawnym obiektem relacji, nie wildcard", () => {
    const query = solve();
    expect(typeof query.populate).toBe("object");
    expect(query.populate).toHaveProperty("cover");
  });

  it("[quality] nie pobiera nadmiarowych pól", () => {
    const query = solve();
    expect(query.fields).toHaveLength(2);
    expect(query.populate).not.toBe("*");
  });
});
