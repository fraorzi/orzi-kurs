import { describe, expect, it } from "vitest";
import type { Equal, Expect } from "@harness/type-assert";
import {
  animalNames,
  withAnimal,
  type Animal,
  type Cat,
  type Dog,
} from "./starter";

const dogs: Dog[] = [
  { name: "Burek", bark: () => "hau" },
];
const cat: Cat = { name: "Filemon", meow: () => "miau" };

describe("readonly collection API", () => {
  it("nie mutuje tablicy podtypu i zwraca szerszy typ", () => {
    const result = withAnimal(dogs, cat);
    type _result = Expect<Equal<typeof result, Animal[]>>;
    expect(result.map((animal) => animal.name)).toEqual(["Burek", "Filemon"]);
    expect(dogs).toHaveLength(1);
    expect(dogs[0].bark()).toBe("hau");
  });

  it("nie pozwala traktować wyniku jak Dog[]", () => {
    const result = withAnimal(dogs, cat);
    const illegal = (): Dog[] => {
      // @ts-expect-error wynik może zawierać dowolne Animal
      return result;
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("animalNames przyjmuje readonly kolekcję", () => {
    const animals = [dogs[0], cat] as const;
    expect(animalNames(animals)).toEqual(["Burek", "Filemon"]);
  });
});
