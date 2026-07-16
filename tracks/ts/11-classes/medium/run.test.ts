import { describe, it, expect } from "vitest";
import {
  Shape,
  Circle,
  Rectangle,
  Square,
  totalArea,
  largest,
  type Describable,
} from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("Shape jest abstrakcyjna — nie da się jej zinstancjonować", () => {
    const illegal = (): void => {
      // @ts-expect-error klasa abstrakcyjna nie ma konstruktora do wywołania
      new Shape();
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("każdy kształt spełnia interfejs Describable", () => {
    const items: Describable[] = [new Circle(1), new Rectangle(1, 2), new Square(2)];
    expect(items.map((item) => item.describe())).toHaveLength(3);
  });

  it("Circle i Rectangle są podtypami Shape", () => {
    const shapes: Shape[] = [new Circle(1), new Rectangle(2, 2), new Square(1)];
    expect(shapes).toHaveLength(3);
  });

  it("wymiary są prywatne", () => {
    const rect = new Rectangle(3, 4);
    const illegal = (): void => {
      // @ts-expect-error width ma być private readonly
      rect.width;
    };
    expect(illegal).toBeTypeOf("function");
    expect(rect.area()).toBe(12);
  });
});

describe("Circle", () => {
  it("liczy pole koła", () => {
    expect(new Circle(2).area()).toBeCloseTo(Math.PI * 4, 10);
  });

  it("ma kind \"circle\" i opisuje się z dwoma miejscami po przecinku", () => {
    expect(new Circle(2).describe()).toBe("circle: 12.57");
  });
});

describe("Rectangle", () => {
  it("liczy pole prostokąta", () => {
    expect(new Rectangle(3, 4).area()).toBe(12);
  });

  it("ma kind \"rectangle\"", () => {
    expect(new Rectangle(3, 4).describe()).toBe("rectangle: 12.00");
  });
});

describe("Square", () => {
  it("jest prostokątem o równych bokach", () => {
    const s = new Square(3);
    expect(s.area()).toBe(9);
    expect(
      s instanceof Rectangle,
      "kwadrat ma dziedziczyć po Rectangle, nie kopiować jego logiki",
    ).toBe(true);
  });

  it("nadpisuje kind na \"square\"", () => {
    expect(new Square(3).describe()).toBe("square: 9.00");
  });
});

describe("describe (wspólna implementacja z Shape)", () => {
  it("jest zdefiniowana raz w klasie bazowej", () => {
    const circleDescribe = Object.getOwnPropertyNames(Circle.prototype);
    expect(
      circleDescribe.includes("describe"),
      "describe ma zostać w Shape — podklasy dostarczają tylko kind i area",
    ).toBe(false);
  });
});

describe("totalArea", () => {
  it("sumuje pola i zaokrągla do dwóch miejsc", () => {
    expect(totalArea([new Circle(1), new Rectangle(2, 3)])).toBe(9.14);
  });

  it("pusta lista daje 0", () => {
    expect(totalArea([])).toBe(0);
  });
});

describe("largest", () => {
  it("zwraca kształt o największym polu", () => {
    const big = new Rectangle(10, 10);
    expect(largest([new Circle(1), big, new Square(2)])).toBe(big);
  });

  it("przy remisie zwraca pierwszy z listy", () => {
    const first = new Square(2);
    const second = new Rectangle(2, 2);
    expect(
      largest([first, second]),
      "remis rozstrzyga kolejność wejściowa — warunek to `>`, nie `>=`",
    ).toBe(first);
  });

  it("nie mutuje wejścia", () => {
    const a = new Circle(1);
    const b = new Rectangle(5, 5);
    const shapes = [a, b];
    largest(shapes);
    expect(
      shapes[0],
      "sort() mutuje tablicę — użyj pętli albo kopii",
    ).toBe(a);
  });

  it("pusta lista daje null", () => {
    expect(largest([])).toBeNull();
  });
});
