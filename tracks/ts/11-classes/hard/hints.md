## Hint 1

`private items` to obietnica dla kompilatora — w runtime pole nadal jest widoczne
(`Object.keys`, `JSON.stringify`). Prawdziwą prywatność daje składnia `#`:

```ts
export class Cart {
  #items = new Map<string, number>();
}
```

Do `#items` sięgasz tylko wewnątrz klasy (`this.#items`).

## Hint 2

Getter to metoda ze słowem `get` i bez nawiasów przy użyciu:

```ts
get size(): number {
  return this.#items.size;
}
```

Brak settera automatycznie czyni pole tylko do odczytu — zapis `cart.size = 9` jest błędem
kompilacji.

## Hint 3

Fabryka statyczna buduje instancję i wypełnia ją przez publiczne API (dzięki temu walidacja
z `add` obowiązuje też tutaj):

```ts
static fromEntries(entries: readonly (readonly [string, number])[]): Cart {
  const cart = new Cart();
  for (const [sku, quantity] of entries) cart.add(sku, quantity);
  return cart;
}
```

## Hint 4

`add` zwraca `this`, żeby dało się łączyć wywołania. Doliczanie sztuk:
`this.#items.set(sku, (this.#items.get(sku) ?? 0) + quantity)`.

## Hint 5

Zwykła metoda po wyrwaniu z obiektu (`const remove = cart.remove`) gubi `this`. Pole
z funkcją strzałkową domyka `this` na stałe — strzałka nie ma własnego `this`, bierze go
z miejsca definicji, czyli z instancji:

```ts
remove = (sku: string): void => {
  this.#items.delete(sku);
};
```

## Hint 6

`toJSON()` jest wywoływane automatycznie przez `JSON.stringify`. `Object.fromEntries(mapa)`
zamienia `Map` na zwykły obiekt jedną instrukcją.
