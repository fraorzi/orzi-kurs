import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { projectRows } from "./starter";

type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
};

const users: User[] = [
  { id: 1, name: "Ala", email: "a@example.com", active: true },
  { id: 2, name: "Ola", email: "o@example.com", active: false },
];

describe("projectRows", () => {
  it("zwraca tylko wybrane pola z dokładnym typem", () => {
    const result = projectRows(users, ["id", "name"]);
    type _result = Expect<
      Equal<typeof result, Array<Pick<User, "id" | "name">>>
    >;
    expect(result).toEqual([
      { id: 1, name: "Ala" },
      { id: 2, name: "Ola" },
    ]);
  });

  it("odrzuca nieznany klucz", () => {
    const illegal = (): unknown =>
      // @ts-expect-error role nie jest kluczem User
      projectRows(users, ["id", "role"]);
    expect(illegal).toBeTypeOf("function");
  });

  it("nie mutuje wejścia i tworzy nowe rekordy", () => {
    const keys: Array<keyof User> = ["email"];
    const result = projectRows(users, keys);
    expect(keys).toEqual(["email"]);
    expect(users[0]).toEqual({
      id: 1,
      name: "Ala",
      email: "a@example.com",
      active: true,
    });
    expect(result[0]).not.toBe(users[0]);
  });

  it("obsługuje puste klucze i puste dane", () => {
    expect(projectRows(users, [])).toEqual([{}, {}]);
    expect(projectRows([] as User[], ["id"])).toEqual([]);
  });
});
