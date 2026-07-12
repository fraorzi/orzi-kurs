import { describe, it, expect } from "vitest";
import { stringifyHidingSecrets, parseWithDates } from "./starter.js";

describe("stringifyHidingSecrets", () => {
  it("pomija pola password i token na najwyższym poziomie", () => {
    expect(
      stringifyHidingSecrets({ user: "ala", password: "x", token: "y", age: 30 }),
      "replacer zwracający undefined dla klucza pomija to pole w wyniku",
    ).toBe('{"user":"ala","age":30}');
  });

  it("pomija sekrety także zagnieżdżone", () => {
    const parsed = JSON.parse(stringifyHidingSecrets({ a: { password: "x", ok: 1 } }));
    expect(parsed, "replacer jest wołany dla KAŻDEGO klucza, także w głąb").toEqual({ a: { ok: 1 } });
  });
});

describe("parseWithDates", () => {
  it("zamienia stringi ISO daty na obiekty Date", () => {
    const obj = parseWithDates('{"created":"2020-01-01T00:00:00.000Z"}');
    expect(obj.created instanceof Date, "reviver ma tworzyć Date z ISO stringów").toBe(true);
    expect(obj.created.getTime()).toBe(Date.UTC(2020, 0, 1));
  });

  it("zwykłe stringi zostawia bez zmian", () => {
    const obj = parseWithDates('{"name":"raport","n":5}');
    expect(obj.name).toBe("raport");
    expect(obj.n).toBe(5);
  });
});
