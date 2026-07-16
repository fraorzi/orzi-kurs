import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  cssVar,
  handlerName,
  envKey,
  isVariant,
  type CssVar,
  type HandlerName,
  type EnvKey,
  type Size,
  type Tone,
  type Variant,
} from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("CssVar dokleja prefiks --", () => {
    type _t = Expect<Equal<CssVar<"gap">, "--gap">>;
    expect(cssVar("gap")).toBe("--gap");
  });

  it("HandlerName używa Capitalize", () => {
    type _t = Expect<Equal<HandlerName<"click">, "onClick">>;
    expect(handlerName("click")).toBe("onClick");
  });

  it("EnvKey podnosi całość do wielkich liter", () => {
    type _t = Expect<Equal<EnvKey<"db_host">, "APP_DB_HOST">>;
    expect(envKey("db_host")).toBe("APP_DB_HOST");
  });

  it("Size i Tone są wyprowadzone z tablic as const", () => {
    type _size = Expect<Equal<Size, "sm" | "md" | "lg">>;
    type _tone = Expect<Equal<Tone, "primary" | "danger">>;
    expect(isVariant("md-danger")).toBe(true);
  });

  it("Variant to iloczyn kartezjański Size × Tone (6 członów)", () => {
    type _t = Expect<
      Equal<
        Variant,
        | "sm-primary"
        | "sm-danger"
        | "md-primary"
        | "md-danger"
        | "lg-primary"
        | "lg-danger"
      >
    >;
    const v: Variant = "lg-primary";
    expect(v).toBe("lg-primary");
  });

  it("wariant spoza iloczynu jest odrzucany przez typ", () => {
    const illegal = (): void => {
      // @ts-expect-error "md-warning" nie należy do Variant — nie ma tonu "warning"
      const v: Variant = "md-warning";
      void v;
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("funkcje zwracają literał, nie string", () => {
    type _t = Expect<Equal<ReturnType<typeof cssVar<"accent">>, "--accent">>;
    const exact: "--accent" = cssVar("accent");
    expect(exact).toBe("--accent");
  });
});

describe("cssVar", () => {
  it("dokleja -- do nazwy", () => {
    expect(cssVar("gap")).toBe("--gap");
  });

  it("nie zmienia wielkości liter", () => {
    expect(cssVar("accentColor")).toBe("--accentColor");
  });
});

describe("handlerName", () => {
  it("skleja on + zdarzenie z wielkiej litery", () => {
    expect(handlerName("click")).toBe("onClick");
    expect(handlerName("focus")).toBe("onFocus");
  });

  it("podnosi tylko pierwszą literę, resztę zostawia", () => {
    expect(
      handlerName("mouseEnter"),
      "Capitalize zmienia wyłącznie pierwszy znak — reszta nazwy zostaje bez zmian",
    ).toBe("onMouseEnter");
  });
});

describe("envKey", () => {
  it("dokleja prefiks app_ i podnosi całość", () => {
    expect(envKey("port")).toBe("APP_PORT");
  });

  it("podnosi też człony po podkreślniku", () => {
    expect(envKey("db_host")).toBe("APP_DB_HOST");
  });
});

describe("isVariant", () => {
  it("przepuszcza poprawną kombinację rozmiaru i tonu", () => {
    expect(isVariant("sm-primary")).toBe(true);
    expect(isVariant("lg-danger")).toBe(true);
  });

  it("odrzuca nieznany rozmiar", () => {
    expect(
      isVariant("xl-primary"),
      "xl nie ma w SIZES — guard ma sprawdzać obie części osobno",
    ).toBe(false);
  });

  it("odrzuca nieznany ton", () => {
    expect(isVariant("sm-warning")).toBe(false);
  });

  it("odrzuca string bez separatora", () => {
    expect(isVariant("sm"), "brakuje tonu — to nie jest pełny wariant").toBe(
      false,
    );
  });

  it("odrzuca string o zbyt wielu członach", () => {
    expect(
      isVariant("sm-primary-x"),
      "sprawdź liczbę członów po split('-'), inaczej 'sm-primary-x' przejdzie",
    ).toBe(false);
  });

  it("zawęża typ stringa z zewnątrz", () => {
    const fromInput: string = "md-danger";
    if (isVariant(fromInput)) {
      const narrowed: Variant = fromInput;
      expect(narrowed).toBe("md-danger");
    } else {
      expect.unreachable("md-danger jest poprawnym wariantem");
    }
  });
});
