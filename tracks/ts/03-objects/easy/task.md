# Easy — kształty obiektów

## 1. `interface Product`

- `id: number`
- `name: string`
- `price: number`
- `tags` — opcjonalna tablica stringów

## 2. `interface DiscountedProduct`

Rozszerza `Product` (użyj `extends`) o pole `discount: number` (0–1).

## 3. `label(product: Product): string`

```ts
label({ id: 1, name: "Kubek", price: 29.9 });                       // "Kubek — 29.90 zł"
label({ id: 1, name: "Kubek", price: 29.9, tags: ["kuchnia", "x"] }); // "Kubek — 29.90 zł [kuchnia, x]"
```

Brak `tags` i pusta tablica `tags` dają ten sam wynik (bez nawiasu kwadratowego).

## 4. `finalPrice(product: DiscountedProduct): number`

Cena po rabacie, zaokrąglona do dwóch miejsc.

```ts
finalPrice({ id: 1, name: "Kubek", price: 100, discount: 0.25 }); // 75
finalPrice({ id: 2, name: "Mysz", price: 79.99, discount: 0.1 }); // 71.99
```
