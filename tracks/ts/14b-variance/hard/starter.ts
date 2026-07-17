export interface Animal {
  name: string;
}

export interface Dog extends Animal {
  bark(): string;
}

export interface Cat extends Animal {
  meow(): string;
}

// TODO: usuń mutację i zmień parametr na readonly oraz wynik na Animal[].
export function addAnimal(animals: Animal[], animal: Animal): void {
  animals.push(animal);
}

export function animalNames(animals: Animal[]): string[] {
  // TODO: tylko odczyt
  return [];
}
