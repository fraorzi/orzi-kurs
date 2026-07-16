import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  COLUMNS,
  TRANSITIONS,
  headers,
  row,
  isColumnKey,
  canTransition,
  nextStates,
  transition,
  type ColumnKey,
  type State,
  type User,
} from "./starter";

const ALA: User = {
  id: 1,
  name: "Ala",
  email: "a@x.pl",
  createdAt: "2024-01-01",
};

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("ColumnKey to unia kluczy z COLUMNS, nie wszystkich pól User", () => {
    type _t = Expect<Equal<ColumnKey, "name" | "email" | "createdAt">>;
    expect(COLUMNS).toHaveLength(3);
  });

  it("COLUMNS zachowuje literalne klucze (satisfies, nie adnotacja)", () => {
    type FirstKey = (typeof COLUMNS)[0]["key"];
    type _t = Expect<Equal<FirstKey, "name">>;
    expect(COLUMNS[0].key).toBe("name");
  });

  it("COLUMNS jest tylko do odczytu", () => {
    const illegal = (): void => {
      // @ts-expect-error as const czyni krotkę readonly
      COLUMNS[0] = { key: "id", label: "ID" };
    };
    expect(illegal).toBeTypeOf("function");
    expect(COLUMNS[0].label).toBe("Nazwa");
  });

  it("TRANSITIONS zachowuje literalne stany", () => {
    type IdleNext = (typeof TRANSITIONS)["idle"];
    type _t = Expect<Equal<IdleNext, readonly ["loading"]>>;
    expect(TRANSITIONS.idle).toEqual(["loading"]);
  });

  it("isColumnKey zawęża string do ColumnKey", () => {
    const key = "email";
    if (isColumnKey(key)) {
      const narrowed: ColumnKey = key;
      expect(narrowed).toBe("email");
    }
    expect(isColumnKey(key)).toBe(true);
  });

  it("nieznany stan jest błędem typu", () => {
    const illegal = (): void => {
      // @ts-expect-error "paused" nie jest stanem
      canTransition("idle", "paused");
    };
    expect(illegal).toBeTypeOf("function");
  });
});

describe("headers", () => {
  it("zwraca etykiety w kolejności kolumn", () => {
    expect(headers()).toEqual(["Nazwa", "E-mail", "Utworzono"]);
  });
});

describe("row", () => {
  it("zwraca wartości w kolejności kolumn", () => {
    expect(row(ALA)).toEqual(["Ala", "a@x.pl", "2024-01-01"]);
  });

  it("pomija pola spoza kolumn (id nie jest kolumną)", () => {
    expect(
      row(ALA),
      "kolejność i zestaw wartości wynikają z COLUMNS, nie z pól User",
    ).not.toContain("1");
  });

  it("wszystkie wartości są stringami", () => {
    expect(row(ALA).every((value) => typeof value === "string")).toBe(true);
  });
});

describe("isColumnKey", () => {
  it("prawda dla klucza kolumny", () => {
    expect(isColumnKey("name")).toBe(true);
  });

  it("fałsz dla pola User, które nie jest kolumną", () => {
    expect(
      isColumnKey("id"),
      "id jest polem User, ale nie ma go w COLUMNS — strażnik pilnuje kolumn, nie modelu",
    ).toBe(false);
  });

  it("fałsz dla kompletnie nieznanego klucza", () => {
    expect(isColumnKey("nick")).toBe(false);
  });
});

describe("canTransition", () => {
  it("dozwolone przejście daje true", () => {
    expect(canTransition("idle", "loading")).toBe(true);
    expect(canTransition("loading", "error")).toBe(true);
  });

  it("niedozwolone przejście daje false", () => {
    expect(canTransition("idle", "done")).toBe(false);
  });

  it("przejście w samego siebie jest niedozwolone", () => {
    expect(canTransition("idle", "idle")).toBe(false);
  });
});

describe("nextStates", () => {
  it("zwraca dozwolone następne stany", () => {
    expect(nextStates("loading")).toEqual(["done", "error"]);
    expect(nextStates("done")).toEqual(["idle"]);
  });
});

describe("transition", () => {
  it("dozwolone przejście zwraca nowy stan", () => {
    expect(transition("loading", "done")).toBe("done");
  });

  it("niedozwolone przejście rzuca Error z opisem", () => {
    expect(() => transition("idle", "done")).toThrow(
      "niedozwolone przejście: idle → done",
    );
  });
});
