import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { requestLabel, type RequestMeta } from "./starter";

describe("declaration merging", () => {
  it("łączy pola obu deklaracji", () => {
    type _keys = Expect<
      Equal<
        keyof RequestMeta,
        "requestId" | "startedAt" | "userId" | "roles"
      >
    >;
    const meta: RequestMeta = {
      requestId: "r1",
      startedAt: 100,
      userId: 7,
      roles: ["admin"],
    };
    expect(requestLabel(meta)).toBe("r1:user=7");
  });

  it("obsługuje brak danych auth", () => {
    expect(requestLabel({ requestId: "r2", startedAt: 200 })).toBe("r2");
  });

  it("używa dwóch deklaracji interface", () => {
    const source = readFileSync(new URL("./starter.ts", import.meta.url), "utf8");
    expect(source.match(/interface\s+RequestMeta/g)).toHaveLength(2);
  });
});
