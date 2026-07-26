# Easy — adnotacje, literały, `as const`

Uzupełnij `starter.ts`. Testy sprawdzają zarówno **zachowanie w runtime**, jak i **typy**
(bramka `tsc --noEmit` w pipeline).

## 1. `CURRENCY`

Stała o typie **literalnym** `"PLN"` — nie `string`.

```ts
CURRENCY; // typ: "PLN"
```

## 2. `formatPrice(amount: number, currency: string): string`

Kwota z dwoma miejscami po przecinku, spacja, waluta.

```ts
formatPrice(12.5, "PLN");  // "12.50 PLN"
formatPrice(0, "EUR");     // "0.00 EUR"
```

## 3. `ROLES`

Stała tablica ról jako **readonly tuple** (`as const`), w kolejności:
`"admin"`, `"editor"`, `"viewer"`.

```ts
ROLES; // typ: readonly ["admin", "editor", "viewer"]
```

## 4. `Role`

Typ będący unią ról — **wyprowadzony z `ROLES`**, nie przepisany ręcznie.

```ts
type Role = ...; // "admin" | "editor" | "viewer"
```
