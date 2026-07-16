import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  toPreview,
  createUser,
  applyPatch,
  countRoles,
  type User,
  type UserPreview,
  type NewUser,
  type UserPatch,
  type RoleCounts,
} from "./starter";

const user: User = {
  id: 1,
  name: "Ala",
  email: "ala@example.com",
  role: "admin",
};

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("UserPreview to id i name wybrane z User (Pick)", () => {
    type _t = Expect<Equal<UserPreview, { id: number; name: string }>>;
    expect(toPreview(user)).toEqual({ id: 1, name: "Ala" });
  });

  it("NewUser to User bez id (Omit)", () => {
    type _t = Expect<
      Equal<
        NewUser,
        { name: string; email: string; role: "admin" | "editor" | "viewer" }
      >
    >;
    const input: NewUser = {
      name: "Bob",
      email: "bob@example.com",
      role: "viewer",
    };
    expect(createUser(input, 7).id).toBe(7);
  });

  it("UserPatch ma wszystkie pola NewUser opcjonalne i żadnego id", () => {
    type _t = Expect<
      Equal<
        UserPatch,
        { name?: string; email?: string; role?: "admin" | "editor" | "viewer" }
      >
    >;
    const empty: UserPatch = {};
    expect(applyPatch(user, empty)).toEqual(user);
  });

  it("RoleCounts wymaga kompletu ról (Record)", () => {
    type _t = Expect<
      Equal<RoleCounts, { admin: number; editor: number; viewer: number }>
    >;
    const illegal = (): void => {
      // @ts-expect-error brakuje klucza viewer — Record<Role, number> wymaga kompletu
      const incomplete: RoleCounts = { admin: 0, editor: 0 };
      void incomplete;
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("UserPreview nie ma pola email", () => {
    const illegal = (): void => {
      // @ts-expect-error Pick<User, "id" | "name"> nie zawiera email
      void toPreview(user).email;
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("patch nie może zawierać id", () => {
    const illegal = (): void => {
      // @ts-expect-error id zostało wycięte przez Omit, więc nie ma go w UserPatch
      applyPatch(user, { id: 2 });
    };
    expect(illegal).toBeTypeOf("function");
  });
});

describe("toPreview", () => {
  it("zwraca wyłącznie id i name", () => {
    expect(
      toPreview(user),
      "podgląd ma nie przeciekać email ani role — skopiuj tylko dwa pola",
    ).toEqual({ id: 1, name: "Ala" });
  });
});

describe("createUser", () => {
  it("dokleja nadane id do danych wejściowych", () => {
    const input: NewUser = {
      name: "Bob",
      email: "bob@example.com",
      role: "viewer",
    };
    expect(createUser(input, 7)).toEqual({
      id: 7,
      name: "Bob",
      email: "bob@example.com",
      role: "viewer",
    });
  });

  it("nie mutuje danych wejściowych", () => {
    const input: NewUser = {
      name: "Bob",
      email: "bob@example.com",
      role: "viewer",
    };
    createUser(input, 7);
    expect(
      input,
      "createUser ma zbudować nowy obiekt, nie dopisywać id do wejścia",
    ).toEqual({ name: "Bob", email: "bob@example.com", role: "viewer" });
  });
});

describe("applyPatch", () => {
  it("nadpisuje tylko pola obecne w patchu", () => {
    expect(applyPatch(user, { name: "Ala K." })).toEqual({
      id: 1,
      name: "Ala K.",
      email: "ala@example.com",
      role: "admin",
    });
  });

  it("pusty patch zwraca kopię bez zmian", () => {
    expect(applyPatch(user, {})).toEqual(user);
  });

  it("zwraca nowy obiekt zamiast mutować wejście", () => {
    const result = applyPatch(user, { role: "editor" });
    expect(result).not.toBe(user);
    expect(
      user.role,
      "patch ma tworzyć nowy obiekt (spread), a nie zapisywać do user",
    ).toBe("admin");
  });
});

describe("countRoles", () => {
  it("zlicza role", () => {
    const users: User[] = [
      user,
      { id: 2, name: "Bob", email: "bob@example.com", role: "editor" },
      { id: 3, name: "Cyd", email: "cyd@example.com", role: "editor" },
    ];
    expect(countRoles(users)).toEqual({ admin: 1, editor: 2, viewer: 0 });
  });

  it("rola bez wystąpień ma wartość 0, nie undefined", () => {
    expect(
      countRoles([]),
      "Record<Role, number> wymaga wszystkich kluczy — zacznij od mapy wyzerowanej",
    ).toEqual({ admin: 0, editor: 0, viewer: 0 });
  });
});
