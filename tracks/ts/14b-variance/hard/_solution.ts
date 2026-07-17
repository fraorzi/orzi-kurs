export interface Animal {
  name: string;
}

export interface Dog extends Animal {
  bark(): string;
}

export interface Cat extends Animal {
  meow(): string;
}

export function withAnimal(
  animals: readonly Animal[],
  animal: Animal,
): Animal[] {
  return [...animals, animal];
}

export function animalNames(animals: readonly Animal[]): string[] {
  return animals.map((animal) => animal.name);
}
