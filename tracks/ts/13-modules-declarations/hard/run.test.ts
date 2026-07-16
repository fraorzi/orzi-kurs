import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { createSettings, type SettingsState } from "./src/settings";

describe("typed settings facade", () => {
  it("wiąże klucz get z typem wartości", () => {
    const settings = createSettings({
      theme: "light",
      pageSize: 20,
      analytics: false,
    });
    type _theme = Expect<Equal<ReturnType<typeof settings.get<"theme">>, "light" | "dark">>;
    type _pageSize = Expect<Equal<ReturnType<typeof settings.get<"pageSize">>, number>>;
    expect(settings.get("theme")).toBe("light");
    expect(settings.get("pageSize")).toBe(20);
  });

  it("set wymaga wartości właściwej dla klucza", () => {
    const settings = createSettings({
      theme: "light",
      pageSize: 20,
      analytics: false,
    });
    settings.set("theme", "dark");
    settings.set("pageSize", 50);
    expect(settings.snapshot()).toEqual({
      theme: "dark",
      pageSize: 50,
      analytics: false,
    });

    const illegal = (): void => {
      // @ts-expect-error theme nie przyjmuje liczby
      settings.set("theme", 1);
      // @ts-expect-error nieznany klucz
      settings.get("locale");
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("snapshot jest readonly i zamrożony", () => {
    const settings = createSettings({
      theme: "light",
      pageSize: 20,
      analytics: false,
    });
    const snapshot = settings.snapshot();
    type _snapshot = Expect<Equal<typeof snapshot, Readonly<SettingsState>>>;
    const illegal = (): void => {
      // @ts-expect-error snapshot jest readonly
      snapshot.pageSize = 10;
    };
    expect(illegal).toBeTypeOf("function");
    expect(Object.isFrozen(snapshot)).toBe(true);
  });
});
