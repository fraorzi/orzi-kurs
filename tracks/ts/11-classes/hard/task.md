# Hard — prawdziwa prywatność (`#`), fabryka statyczna i metoda odporna na utratę `this`

## `class Cart`

Koszyk trzymający `sku → liczba sztuk`.

### Stan

Wewnętrzna mapa ma być polem **prywatnym w runtime** (`#items: Map<string, number>`), a nie
tylko `private`. Test sprawdza, że nie widać jej w `Object.keys(cart)` ani w
`JSON.stringify`.

### Konstruktor i fabryka

```ts
new Cart();                                  // pusty
Cart.fromEntries([["mug", 2], ["kbd", 1]]);  // fabryka statyczna
```

### API

```ts
cart.add("mug", 2);      // zwraca this — da się łączyć: cart.add("a", 1).add("b", 2)
cart.remove("mug");      // usuwa pozycję w całości (bez względu na liczbę sztuk)
cart.size;               // getter: liczba różnych pozycji
cart.units;              // getter: łączna liczba sztuk
cart.toJSON();           // { mug: 2, kbd: 1 }  — zwykły obiekt
```

- `add` z liczbą sztuk `<= 0` → `RangeError("liczba sztuk musi być dodatnia")`,
- `add` na istniejącym sku **dolicza** sztuki,
- `remove` nieistniejącego sku niczego nie psuje (po cichu nic nie robi),
- `size` i `units` to gettery (bez nawiasów), tylko do odczytu.

### Metoda przekazywana jako callback

`remove` musi działać po wyrwaniu z obiektu:

```ts
["mug", "kbd"].forEach(cart.remove);   // ma zadziałać, nie wysypać się na this
```

Zwykła metoda gubi tu `this`. Rozwiąż to polem z funkcją strzałkową
(`remove = (sku: string): void => { … }`), a nie `.bind` w konstruktorze.

Uwaga: `forEach` przekazuje callbackowi trzy argumenty (element, indeks, tablica). Sygnatura
`remove(sku: string)` musi to znieść — funkcja o mniejszej arności jest przypisywalna.

### `JSON.stringify(cart)`

Ma dać `{"mug":2}` dzięki `toJSON()` — a nie wewnętrzną mapę.
