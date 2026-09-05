# Medium - mapa stałych jako jedno źródło prawdy

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Statusy artykułu trzymamy w jednej stałej. Z niej mają wynikać **wszystkie** typy - nie
przepisuj unii ręcznie.

Uzupełnij `starter.ts`.

## 1. `STATUS`

Mapa stałych (`as const`) - klucz i wartość takie same:

```ts
STATUS; // { readonly draft: "draft"; readonly review: "review"; readonly published: "published" }
```

## 2. `Status`

Typ będący unią **wartości** mapy, wyprowadzony z `STATUS`.

```ts
type Status = ...; // "draft" | "review" | "published"
```

## 3. `LABELS`

Mapa etykiet dla każdego statusu, typowana jako `Record<Status, string>` - pominięcie
statusu ma być błędem typu.

```ts
LABELS.draft;      // "Szkic"
LABELS.review;     // "W recenzji"
LABELS.published;  // "Opublikowany"
```

## 4. `nextStatus(current: Status): Status`

Przesunięcie w przód po ścieżce `draft → review → published`. `published` jest końcowy -
zwraca sam siebie.

```ts
nextStatus("draft");      // "review"
nextStatus("review");     // "published"
nextStatus("published");  // "published"
```

## 5. `describeStatus(current: Status): string`

Etykieta z `LABELS` plus status w nawiasie.

```ts
describeStatus("review"); // "W recenzji (review)"
```
