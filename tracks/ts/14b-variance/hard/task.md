# Hard — usunięcie dziury mutowalnej tablicy

Starter przyjmuje `Animal[]` i dopisuje element. `Dog[]` jest przypisywalne do
`Animal[]`, więc funkcja może włożyć kota do tablicy psów.

Zastąp API przez:

```ts
withAnimal(
  animals: readonly Animal[],
  animal: Animal
): Animal[]
```

Funkcja zwraca nową tablicę, nie mutuje wejścia i nie obiecuje, że wynik nadal jest
tablicą podtypu. Zaimplementuj też `animalNames(readonly Animal[])`.
