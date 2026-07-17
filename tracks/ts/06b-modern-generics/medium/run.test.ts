import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { selectOption } from "./starter";

describe("selectOption", () => {
  it("wyprowadza unię wyłącznie z options", () => {
    const selected = selectOption(
      ["system", "light", "dark"],
      "dark",
      "system",
    );
    type _selected = Expect<
      Equal<typeof selected, "system" | "light" | "dark">
    >;
    expect(selected).toBe("dark");
  });

  it("używa fallbacku dla braku lub nieznanej wartości", () => {
    expect(selectOption(["pl", "en"], undefined, "pl")).toBe("pl");
    expect(selectOption(["pl", "en"], "de", "en")).toBe("en");
  });

  it("NoInfer nie pozwala fallbackowi poszerzyć opcji", () => {
    const illegal = (): unknown =>
      // @ts-expect-error green nie występuje w options
      selectOption(["red", "blue"], undefined, "green");
    expect(illegal).toBeTypeOf("function");
  });
});
