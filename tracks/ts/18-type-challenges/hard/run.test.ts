import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import type { DeepPick } from "./starter";

type User = {
  readonly id: string;
  profile?: {
    name: string;
    age: number;
    avatarUrl: string;
  };
  settings: {
    theme: "light" | "dark";
    locale: string;
  };
  audit: {
    createdAt: Date;
  };
};

type Selected = DeepPick<
  User,
  "id" | "profile.name" | "profile.age" | "settings.theme"
>;

type Expected = {
  readonly id: string;
  profile?: {
    name: string;
    age: number;
  };
  settings: {
    theme: "light" | "dark";
  };
};

type _selected = Expect<Equal<Selected, Expected>>;
type _single = Expect<
  Equal<
    DeepPick<User, "audit.createdAt">,
    { audit: { createdAt: Date } }
  >
>;

describe("DeepPick", () => {
  it("scala ścieżki i zachowuje modyfikatory właściwości", () => {
    expect(true).toBe(true);
  });
});
