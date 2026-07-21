import { describe, expect, it } from "vitest";
import { solve } from "./starter";

describe("policy dla redaktora", () => {
  it("dopuszcza role editor i admin", () => {
    expect(solve({ role: "editor" })).toBe(true);
    expect(solve({ role: "admin" })).toBe(true);
  });

  it("odrzuca rolę public i nieznaną rolę", () => {
    expect(solve({ role: "public" })).toBe(false);
    expect(solve({ role: "guest" })).toBe(false);
  });

  it("odrzuca brak tożsamości i brak roli", () => {
    expect(solve(undefined)).toBe(false);
    expect(solve({})).toBe(false);
  });

  it("nie traktuje obecności użytkownika jako wystarczającego dowodu", () => {
    expect(solve({ role: "" })).toBe(false);
    expect(solve({ role: "Editor" })).toBe(false);
  });
});
