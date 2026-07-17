import { describe, expect, it, vi } from "vitest";
import { notifyAll, type Animal, type Handler } from "./starter";

type Dog = Extract<Animal, { kind: "dog" }>;

const animals: Animal[] = [
  { kind: "dog", name: "Burek", bark: () => "hau" },
  { kind: "cat", name: "Filemon", meow: () => "miau" },
];

describe("Handler", () => {
  it("odrzuca handler wyspecjalizowany tylko dla psa", () => {
    const dogOnly: Handler<Dog> = {
      handle: (dog) => {
        dog.bark();
      },
    };
    const illegal = (): void => {
      // @ts-expect-error notifyAll może przekazać kota
      notifyAll(animals, dogOnly);
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("wywołuje bezpieczny handler dla każdego zwierzęcia", () => {
    const handle = vi.fn<(animal: Animal) => void>();
    notifyAll(animals, { handle });
    expect(handle.mock.calls.map(([animal]) => animal.name)).toEqual([
      "Burek",
      "Filemon",
    ]);
  });
});
