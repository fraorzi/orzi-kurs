import { describe, it, expect } from "vitest";
import { createWithDefaults, readSource } from "./starter.js";

describe("createWithDefaults", () => {
  const defaults = { theme: "dark", lang: "pl" };

  it("nadpisane klucze są własne, reszta spada do prototypu", () => {
    const config = createWithDefaults(defaults, { lang: "en" });
    expect(config.lang).toBe("en");
    expect(config.theme, "brak własnego theme — odczyt ma iść po łańcuchu do defaults").toBe("dark");
  });

  it("defaults są prototypem, nie kopią", () => {
    const config = createWithDefaults(defaults, {});
    expect(
      Object.hasOwn(config, "theme"),
      "theme nie może być przekopiowane — ma być czytane z prototypu (Object.create, nie spread)",
    ).toBe(false);
    expect(Object.getPrototypeOf(config)).toBe(defaults);
  });

  it("zapis na obiekcie nie zmienia defaults", () => {
    const config = createWithDefaults(defaults, {});
    config.theme = "light";
    expect(defaults.theme, "zapis tworzy własną właściwość — prototyp musi zostać nietknięty").toBe("dark");
  });
});

describe("readSource", () => {
  const animal = { eats: true };

  it("rozróżnia own / inherited / missing", () => {
    const rabbit = Object.create(animal);
    rabbit.jumps = true;
    expect(readSource(rabbit, "jumps")).toBe("own");
    expect(
      readSource(rabbit, "eats"),
      "eats jest w łańcuchu (operator in), ale nie własne (Object.hasOwn) — to 'inherited'",
    ).toBe("inherited");
    expect(readSource(rabbit, "flies")).toBe("missing");
  });

  it("po zapisie na obiekcie właściwość staje się własna", () => {
    const rabbit = Object.create(animal);
    rabbit.eats = false;
    expect(readSource(rabbit, "eats")).toBe("own");
    expect(animal.eats, "zapis na rabbit nie może zmienić animal").toBe(true);
  });

  it("działa dla głębszych łańcuchów", () => {
    const base = { x: 1 };
    const mid = Object.create(base);
    const top = Object.create(mid);
    expect(readSource(top, "x")).toBe("inherited");
  });
});
