import { describe, it, expect } from "vitest";
import { styleItems } from "./starter.js";

describe("styleItems — poprawność", () => {
  it("dokleja policzony styl do każdego elementu", () => {
    const computeStyle = (theme) => ({ color: theme });
    expect(styleItems([{ id: 1 }, { id: 2 }], "dark", computeStyle)).toEqual([
      { id: 1, style: { color: "dark" } },
      { id: 2, style: { color: "dark" } },
    ]);
  });

  it("nie mutuje elementów wejściowych", () => {
    const items = [{ id: 1 }];
    styleItems(items, "x", () => ({}));
    expect(items, "map z rozłożeniem { ...item } tworzy nowe obiekty").toEqual([{ id: 1 }]);
  });
});

describe("styleItems — niezmiennik poza pętlą", () => {
  it("[quality] liczy styl raz, a nie dla każdego elementu", () => {
    let calls = 0;
    const computeStyle = (theme) => {
      calls += 1;
      return { color: theme };
    };
    styleItems([{ id: 1 }, { id: 2 }, { id: 3 }], "dark", computeStyle);
    expect(
      calls,
      "computeStyle(theme) nie zależy od elementu — policz go RAZ przed map, potem tylko dokładaj",
    ).toBe(1);
  });
});
