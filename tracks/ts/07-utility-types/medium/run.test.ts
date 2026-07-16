import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  findUser,
  findUserOrThrow,
  isActive,
  describeActive,
  filterByKind,
  type UserRecord,
  type AppEvent,
  type ClickEvent,
  type ActiveEvent,
  type EventKind,
  type FindUserArgs,
  type FindUserResult,
  type FoundUser,
} from "./starter";

const events: AppEvent[] = [
  { kind: "click", x: 3, y: 4 },
  { kind: "close" },
  { kind: "key", key: "a" },
  { kind: "scroll", top: 100 },
];

describe("typy wyprowadzone z findUser (sprawdzane przez tsc --noEmit)", () => {
  it("FindUserArgs to krotka parametrów findUser", () => {
    type _t = Expect<Equal<FindUserArgs, [id: number, withPosts: boolean]>>;
    const args: FindUserArgs = [1, true];
    expect(args).toEqual([1, true]);
  });

  it("FindUserResult to wynik findUser po zdjęciu Promise", () => {
    type _t = Expect<Equal<FindUserResult, UserRecord | null>>;
    expect(findUser(99, true)).resolves.toBeNull();
  });

  it("FoundUser to FindUserResult bez null", () => {
    type _t = Expect<Equal<FoundUser, UserRecord>>;
    expect(findUserOrThrow(1, true)).resolves.toMatchObject({ id: 1 });
  });

  it("findUserOrThrow ma dokładnie tyle argumentów, co findUser", () => {
    const illegal = (): void => {
      // @ts-expect-error brakuje drugiego argumentu z Parameters<typeof findUser>
      void findUserOrThrow(1);
    };
    expect(illegal).toBeTypeOf("function");
  });
});

describe("typy zdarzeń (sprawdzane przez tsc --noEmit)", () => {
  it("ClickEvent to wariant \"click\" wyciągnięty z unii", () => {
    type _t = Expect<
      Equal<ClickEvent, { kind: "click"; x: number; y: number }>
    >;
    expect(filterByKind(events, "click")).toHaveLength(1);
  });

  it("ActiveEvent to unia bez wariantu \"close\"", () => {
    type _t = Expect<
      Equal<
        ActiveEvent,
        | { kind: "click"; x: number; y: number }
        | { kind: "key"; key: string }
        | { kind: "scroll"; top: number }
      >
    >;
    expect(events.filter(isActive)).toHaveLength(3);
  });

  it("EventKind to unia nazw zdarzeń", () => {
    type _t = Expect<Equal<EventKind, "click" | "key" | "scroll" | "close">>;
    const kind: EventKind = "scroll";
    expect(filterByKind(events, kind)).toHaveLength(1);
  });

  it("isActive jest predykatem typu — zawęża tablicę do ActiveEvent[]", () => {
    const active = events.filter(isActive);
    type _t = Expect<Equal<typeof active, ActiveEvent[]>>;
    expect(active.map((event) => event.kind)).toEqual(["click", "key", "scroll"]);
  });

  it("describeActive nie przyjmuje wariantu \"close\"", () => {
    const illegal = (): void => {
      // @ts-expect-error "close" zostało wykluczone przez Exclude
      describeActive({ kind: "close" });
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("filterByKind zwraca dokładnie ten wariant, o który pytasz", () => {
    const clicks = filterByKind(events, "click");
    type _clicks = Expect<Equal<typeof clicks, ClickEvent[]>>;
    const closes = filterByKind(events, "close");
    type _closes = Expect<Equal<typeof closes, { kind: "close" }[]>>;
    expect([clicks.length, closes.length]).toEqual([1, 1]);
  });

  it("filterByKind nie przyjmuje nazwy spoza unii", () => {
    const illegal = (): void => {
      // @ts-expect-error "hover" nie jest wariantem AppEvent
      filterByKind(events, "hover");
    };
    expect(illegal).toBeTypeOf("function");
  });
});

describe("findUserOrThrow", () => {
  it("zwraca użytkownika, gdy istnieje", async () => {
    const user = await findUserOrThrow(1, true);
    expect(user).toEqual({
      id: 1,
      name: "Ala",
      email: "ala@example.com",
      posts: [{ id: 10, title: "Wstęp" }],
    });
  });

  it("przekazuje wszystkie argumenty do findUser", async () => {
    const user = await findUserOrThrow(1, false);
    expect(
      user.posts,
      "withPosts = false ma dojść do findUser — przekaż cały rest-parametr",
    ).toEqual([]);
  });

  it("rzuca Error, gdy findUser zwróci null", async () => {
    await expect(findUserOrThrow(99, true)).rejects.toThrow(
      "nie znaleziono użytkownika: 99",
    );
  });
});

describe("isActive", () => {
  it("odrzuca wyłącznie zdarzenie \"close\"", () => {
    expect(isActive({ kind: "close" })).toBe(false);
    expect(isActive({ kind: "key", key: "a" })).toBe(true);
  });
});

describe("describeActive", () => {
  it("opisuje kliknięcie współrzędnymi", () => {
    expect(describeActive({ kind: "click", x: 3, y: 4 })).toBe("click 3,4");
  });

  it("opisuje klawisz i przewinięcie", () => {
    expect(describeActive({ kind: "key", key: "a" })).toBe("key a");
    expect(describeActive({ kind: "scroll", top: 100 })).toBe("scroll 100");
  });
});

describe("filterByKind", () => {
  it("zwraca wyłącznie zdarzenia o podanym rodzaju", () => {
    expect(filterByKind(events, "click")).toEqual([
      { kind: "click", x: 3, y: 4 },
    ]);
  });

  it("brak dopasowań daje pustą tablicę", () => {
    expect(filterByKind([{ kind: "close" }], "key")).toEqual([]);
  });
});
