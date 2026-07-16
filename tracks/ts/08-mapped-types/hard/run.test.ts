import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  deepFreeze,
  deepMerge,
  type DeepPartial,
  type DeepReadonly,
} from "./starter";

interface Settings {
  theme: { color: string; density: { rows: number } };
  tags: string[];
  version: number;
}

function makeSettings(): Settings {
  return {
    theme: { color: "iris", density: { rows: 3 } },
    tags: ["a", "b"],
    version: 1,
  };
}

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("DeepReadonly nakłada readonly na każdym poziomie", () => {
    type _t = Expect<
      Equal<
        DeepReadonly<Settings>,
        {
          readonly theme: {
            readonly color: string;
            readonly density: { readonly rows: number };
          };
          readonly tags: readonly string[];
          readonly version: number;
        }
      >
    >;
    expect(deepFreeze(makeSettings()).version).toBe(1);
  });

  it("zapis do zagnieżdżonego pola DeepReadonly to błąd typu", () => {
    const frozen = deepFreeze(makeSettings());
    const illegal = (): void => {
      // @ts-expect-error color jest readonly w głąb
      frozen.theme.color = "amber";
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("DeepPartial robi opcjonalnym każde pole w głąb", () => {
    type _t = Expect<
      Equal<
        DeepPartial<{ theme: { color: string } }>,
        { theme?: { color?: string } }
      >
    >;
    const patch: DeepPartial<Settings> = { theme: { color: "amber" } };
    expect(patch.theme?.color).toBe("amber");
  });

  it("DeepPartial na tablicy robi opcjonalne ELEMENTY (pułapka homomorficznego mapowania)", () => {
    type _t = Expect<
      Equal<DeepPartial<{ tags: string[] }>, { tags?: (string | undefined)[] }>
    >;
    // Naprawienie tego wymaga typu warunkowego — zagadnienie 09.
    const patch: DeepPartial<{ tags: string[] }> = { tags: ["a", undefined] };
    expect(patch.tags).toEqual(["a", undefined]);
  });

  it("deepMerge zwraca komplet T, nie DeepPartial", () => {
    const merged = deepMerge(makeSettings(), { version: 2 });
    type _t = Expect<Equal<typeof merged, Settings>>;
    expect(merged.version).toBe(2);
  });
});

describe("deepFreeze", () => {
  it("zamraża obiekt najwyższego poziomu", () => {
    expect(Object.isFrozen(deepFreeze(makeSettings()))).toBe(true);
  });

  it("zamraża zagnieżdżone obiekty", () => {
    const frozen = deepFreeze(makeSettings());
    expect(
      Object.isFrozen(frozen.theme.density),
      "freeze ma iść w głąb — Object.freeze samo w sobie jest płytkie",
    ).toBe(true);
  });

  it("zamraża tablice", () => {
    expect(Object.isFrozen(deepFreeze(makeSettings()).tags)).toBe(true);
  });

  it("zwraca ten sam obiekt, nie kopię", () => {
    const settings = makeSettings();
    expect(
      deepFreeze(settings),
      "freeze działa w miejscu — kopiowanie zostawiłoby oryginał mutowalnym",
    ).toBe(settings);
  });

  it("nie wywraca się na prymitywach", () => {
    expect([deepFreeze(1), deepFreeze("x"), deepFreeze(null)]).toEqual([
      1,
      "x",
      null,
    ]);
  });

  it("zapis do zamrożonego pola rzuca w runtime (moduły ESM są strict)", () => {
    const frozen = deepFreeze(makeSettings());
    const escape = frozen as unknown as Settings;
    expect(
      () => {
        escape.theme.color = "amber";
      },
      "zamrożenie ma sięgać w głąb — gdyby theme nie było zamrożone, zapis by przeszedł",
    ).toThrow(TypeError);
    expect(frozen.theme.color).toBe("iris");
  });
});

describe("deepMerge", () => {
  it("nadpisuje pole prymitywne", () => {
    expect(deepMerge(makeSettings(), { version: 2 }).version).toBe(2);
  });

  it("scala zagnieżdżony obiekt zamiast go podmieniać", () => {
    const merged = deepMerge(makeSettings(), { theme: { color: "amber" } });
    expect(
      merged.theme,
      "patch dotyczył tylko color — density musi przeżyć scalanie",
    ).toEqual({ color: "amber", density: { rows: 3 } });
  });

  it("schodzi rekurencyjnie na dowolną głębokość", () => {
    const merged = deepMerge(makeSettings(), {
      theme: { density: { rows: 10 } },
    });
    expect(merged.theme).toEqual({ color: "iris", density: { rows: 10 } });
  });

  it("tablicę nadpisuje w całości, nie scala po indeksach", () => {
    const merged = deepMerge(makeSettings(), { tags: ["z"] });
    expect(
      merged.tags,
      "scalanie tablic po indeksach dawałoby ['z', 'b'] — kontrakt mówi: nadpisz całość",
    ).toEqual(["z"]);
  });

  it("pomija pola o wartości undefined", () => {
    const merged = deepMerge(makeSettings(), { version: undefined });
    expect(
      merged.version,
      "undefined w patchu znaczy 'nie zmieniaj', a nie 'wyczyść'",
    ).toBe(1);
  });

  it("nie mutuje bazy", () => {
    const base = makeSettings();
    deepMerge(base, { theme: { color: "amber" } });
    expect(
      base.theme.color,
      "deepMerge ma budować nowe obiekty na każdym scalanym poziomie",
    ).toBe("iris");
  });

  it("nie mutuje patcha", () => {
    const patch: DeepPartial<Settings> = { theme: { color: "amber" } };
    deepMerge(makeSettings(), patch);
    expect(patch).toEqual({ theme: { color: "amber" } });
  });

  it("pusty patch zwraca równoważną kopię bazy", () => {
    const base = makeSettings();
    const merged = deepMerge(base, {});
    expect(merged).toEqual(base);
    expect(merged).not.toBe(base);
  });
});
