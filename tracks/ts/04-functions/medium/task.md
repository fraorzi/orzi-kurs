# Medium - przeciążenia (overloads)

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

## 1. `range` - trzy sygnatury, jedna implementacja

```ts
range(3);           // [0, 1, 2]        - stop
range(1, 4);        // [1, 2, 3]        - start, stop
range(0, 10, 5);    // [0, 5]           - start, stop, step
range(5, 0, -2);    // [5, 3, 1]        - krok ujemny
range(3, 3);        // []               - pusty przedział
```

Zadeklaruj **trzy przeciążenia** i jedną implementację. Wywołanie z czterema argumentami
albo `range()` bez argumentów ma być błędem typu.

Krok `0` to błąd wykonania: rzuć `RangeError("krok nie może być zerem")`.

## 2. `parseSetting` - wynik zależny od typu argumentu

```ts
parseSetting("on");      // true      (string → boolean)
parseSetting("off");     // false
parseSetting("cokolwiek"); // false
parseSetting(1);         // "1"       (number → string)
```

Sygnatury:

```ts
function parseSetting(value: string): boolean;
function parseSetting(value: number): string;
```

Wynik `parseSetting("on")` ma mieć typ `boolean` (nie `string | boolean`) - to jest sens
przeciążeń. `parseSetting(true)` ma być błędem typu.

## 3. `assertNever(value: never): never`

Bramka wyczerpania: rzuca `Error` z komunikatem
`` `nieobsłużony wariant: ${JSON.stringify(value)}` ``.

Użyj jej w `describeSetting(value: string | number): string`:

```ts
describeSetting("on");  // "przełącznik: true"
describeSetting(2);     // "wartość: 2"
```

W gałęzi `default` (albo po sprawdzeniu obu `typeof`) wywołaj `assertNever(value)` - po
zawężeniu obu wariantów `value` ma tam typ `never`, więc kompilacja przejdzie tylko wtedy,
gdy naprawdę obsłużyłeś wszystko.
