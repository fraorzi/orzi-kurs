import { describe, expect, it, vi } from "vitest";
import {
  transfer,
  type Animal,
  type Consumer,
  type Dog,
  type Producer,
} from "./starter";

const dog: Dog = { name: "Burek", bark: () => "hau" };

describe("wariancja", () => {
  it("producer jest kowariantny", () => {
    const dogProducer: Producer<Dog> = () => dog;
    const animalProducer: Producer<Animal> = dogProducer;
    expect(animalProducer().name).toBe("Burek");

    const illegal = (): Producer<Dog> => {
      const general: Producer<Animal> = () => ({ name: "animal" });
      // @ts-expect-error ogólny producent nie gwarantuje psa
      return general;
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("consumer jest kontrawariantny", () => {
    const consumeAnimal: Consumer<Animal> = vi.fn();
    const consumeDog: Consumer<Dog> = consumeAnimal;
    consumeDog(dog);
    expect(consumeAnimal).toHaveBeenCalledWith(dog);

    const illegal = (): Consumer<Animal> => {
      const dogOnly: Consumer<Dog> = (value) => value.bark();
      // @ts-expect-error dogOnly nie obsłuży dowolnego Animal
      return dogOnly;
    };
    expect(illegal).toBeTypeOf("function");
  });

  it("transfer przekazuje wyprodukowaną wartość", () => {
    const consumer = vi.fn();
    transfer(() => dog, consumer);
    expect(consumer).toHaveBeenCalledWith(dog);
  });
});
