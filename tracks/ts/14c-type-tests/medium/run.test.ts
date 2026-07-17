import { describe, expect, it } from "vitest";
import { keyBy } from "./src/key-by";

describe("keyBy", () => {
  it("indeksuje elementy i zachowuje ostatni duplikat", () => {
    const users = [
      { id: 1, email: "old@example.com" },
      { id: 1, email: "new@example.com" },
      { id: 2, email: "two@example.com" },
    ];
    const result = keyBy(users, (user) => user.id);
    expect(result.get(1)).toEqual({ id: 1, email: "new@example.com" });
    expect(result.get(2)).toEqual({ id: 2, email: "two@example.com" });
  });

  it("obsługuje pustą listę", () => {
    expect(keyBy([] as string[], (value) => value).size).toBe(0);
  });
});
