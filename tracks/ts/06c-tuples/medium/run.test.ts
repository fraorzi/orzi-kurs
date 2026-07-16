import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  executeCommand,
  makeCommand,
  type AnyCommand,
} from "./starter";

describe("komendy", () => {
  it("wyprowadza konkretny wariant i etykietowane argumenty", () => {
    const command = makeCommand("createUser", "Ala", true);
    type _command = Expect<
      Equal<
        typeof command,
        { name: "createUser"; args: [name: string, admin: boolean] }
      >
    >;
    expect(command).toEqual({
      name: "createUser",
      args: ["Ala", true],
    });
  });

  it("AnyCommand jest unią wszystkich wpisów mapy", () => {
    type Ping = Extract<AnyCommand, { name: "ping" }>;
    type _ping = Expect<Equal<Ping, { name: "ping"; args: [] }>>;
    expect(makeCommand("ping")).toEqual({ name: "ping", args: [] });
  });

  it("odrzuca złą liczbę lub typ argumentów", () => {
    const wrongType = (): unknown =>
      // @ts-expect-error id musi być number
      makeCommand("deleteUser", "7");
    const missing = (): unknown =>
      // @ts-expect-error createUser wymaga dwóch argumentów
      makeCommand("createUser", "Ala");
    expect([wrongType, missing]).toHaveLength(2);
  });

  it("wykonuje wszystkie warianty", () => {
    expect(executeCommand(makeCommand("createUser", "Ala", false))).toBe(
      "create:Ala:user",
    );
    expect(executeCommand(makeCommand("deleteUser", 7))).toBe("delete:7");
    expect(executeCommand(makeCommand("ping"))).toBe("pong");
  });
});
