## Hint 1

`Record<string, number>` pozwala na zapis. Owiń go w `Readonly<...>`:

```ts
export type Stock = Readonly<Record<string, number>>;
```

Teraz `stock.a = 2` jest błędem kompilacji — dokładnie tego pilnuje test.

## Hint 2

Żeby zmodyfikować readonly słownik, zrób z niego mutowalną kopię i pracuj na niej:

```ts
const next: Record<string, number> = { ...stock };
```

Zwracany typ (`Stock`) i tak zamknie ją z powrotem w tryb tylko do odczytu.

## Hint 3

`next[sku] ?? 0` daje bieżący stan albo zero dla nieznanego sku. Po dodaniu `delta`
sprawdź znak: `> 0` → zapis, w przeciwnym razie `delete next[sku]`.

To załatwia naraz trzy przypadki z treści: wyzerowanie, wartość ujemną i nieznane sku
z ujemną deltą.

## Hint 4

`lowStock`: `Object.entries` daje pary `[klucz, wartość]`. Filtruj po wartości, mapuj na
klucz, na końcu `sort((a, b) => a.localeCompare(b))`.
