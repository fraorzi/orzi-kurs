import { describe, it, expect } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import { Stack, mapStack, type Transform } from "./starter";

describe("typy (sprawdzane przez tsc --noEmit)", () => {
  it("Stack<T> przyjmuje tylko elementy typu T", () => {
    const stack = new Stack<string>();
    stack.push("a");
    const illegal = (): void => {
      // @ts-expect-error liczba nie jest stringiem
      stack.push(1);
    };
    expect(illegal).toBeTypeOf("function");
    expect(stack.size).toBe(1);
  });

  it("pop i peek zwracają T | undefined", () => {
    const stack = Stack.from([1, 2]);
    type _pop = Expect<Equal<ReturnType<Stack<number>["pop"]>, number | undefined>>;
    type _peek = Expect<Equal<ReturnType<Stack<number>["peek"]>, number | undefined>>;
    type _from = Expect<Equal<typeof stack, Stack<number>>>;
    expect(stack.pop()).toBe(2);
  });

  it("Transform<T, U> to funkcja (value: T) => U", () => {
    type _t = Expect<Equal<Transform<number, string>, (value: number) => string>>;
    const toLabel: Transform<number, string> = (value) => value.toFixed(2);
    expect(toLabel(1)).toBe("1.00");
  });

  it("mapStack wnioskuje U z typu zwracanego callbacku", () => {
    const labels = mapStack(Stack.from([1, 2]), (n) => n.toFixed(2));
    type _t = Expect<Equal<typeof labels, Stack<string>>>;
    expect(labels.toArray()).toEqual(["1.00", "2.00"]);
  });
});

describe("Stack", () => {
  it("zdejmuje elementy w kolejności LIFO", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    expect(
      [stack.pop(), stack.pop()],
      "stos zdejmuje od wierzchu — ostatni włożony wychodzi pierwszy",
    ).toEqual([2, 1]);
  });

  it("pop na pustym stosie zwraca undefined", () => {
    expect(new Stack<number>().pop()).toBeUndefined();
  });

  it("peek pokazuje wierzch, ale go nie zdejmuje", () => {
    const stack = Stack.from(["a", "b"]);
    expect(stack.peek()).toBe("b");
    expect(
      stack.size,
      "peek tylko podgląda — rozmiar nie może się zmienić",
    ).toBe(2);
  });

  it("size to getter, nie metoda", () => {
    const stack = Stack.from([1, 2, 3]);
    expect(
      stack.size,
      "dostęp bez nawiasów — `get size()` zwraca liczbę, nie funkcję",
    ).toBe(3);
  });

  it("isEmpty rozpoznaje pusty i niepusty stos", () => {
    const stack = new Stack<number>();
    expect(stack.isEmpty()).toBe(true);
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
  });

  it("toArray zwraca elementy od dna do wierzchu", () => {
    expect(Stack.from([1, 2, 3]).toArray()).toEqual([1, 2, 3]);
  });

  it("toArray zwraca kopię — zmiana wyniku nie rusza stosu", () => {
    const stack = Stack.from([1, 2]);
    const items = stack.toArray();
    items.push(99);
    expect(
      stack.size,
      "toArray ma zwracać kopię ([...items]), nie referencję do pola",
    ).toBe(2);
  });

  it("from buduje stos z tablicy, zachowując kolejność", () => {
    const stack = Stack.from(["a", "b"]);
    expect(stack.pop(), "ostatni element tablicy ląduje na wierzchu").toBe("b");
  });

  it("from z pustej tablicy daje pusty stos", () => {
    expect(Stack.from([]).isEmpty()).toBe(true);
  });
});

describe("mapStack", () => {
  it("transformuje wszystkie elementy, zachowując kolejność", () => {
    const labels = mapStack(Stack.from([1, 2, 3]), (n) => n * 10);
    expect(labels.toArray()).toEqual([10, 20, 30]);
  });

  it("nie opróżnia stosu źródłowego", () => {
    const numbers = Stack.from([1, 2, 3]);
    mapStack(numbers, (n) => n * 2);
    expect(
      numbers.size,
      "czytaj przez toArray() — pop() zjadłby elementy źródła",
    ).toBe(3);
  });

  it("zwraca nowy stos, nie ten sam obiekt", () => {
    const numbers = Stack.from([1]);
    expect(mapStack(numbers, (n) => n)).not.toBe(numbers);
  });

  it("pusty stos daje pusty stos", () => {
    expect(mapStack(new Stack<number>(), (n) => n * 2).isEmpty()).toBe(true);
  });
});
