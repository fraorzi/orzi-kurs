# Hard — `zip` zachowujący pozycje

Zaimplementuj typ `Zip<Left, Right>` i funkcję `zip`.

```ts
zip(["id", "name"] as const, [1, "Ala"] as const);
// readonly [["id", 1], ["name", "Ala"]]
```

Wymagania:

- wynik zachowuje typ każdej pozycji,
- prawa tuple musi mieć tę samą długość co lewa,
- wynik i pary są readonly,
- wejścia nie są mutowane,
- puste tuple dają pustą tuple.

Użyj mapped type po kluczach lewej tuple i `const` type parameters.
