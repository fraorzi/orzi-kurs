# Type challenges jako egzamin praktyczny

Programowanie typów ma sens wtedy, gdy usuwa duplikację między kontraktami, a nie gdy
produkuje trudne do utrzymania łamigłówki. Ten blok sprawdza łączenie mechanizmów z
poprzednich lekcji na przykładach spotykanych w bibliotekach i aplikacjach.

## Unia rozłączna → mapa

Mapped type z key remapping może przejść po elementach unii i użyć literału z pola
`type` jako klucza:

```ts
type ByType<Event extends { type: string }> = {
  [Current in Event as Current["type"]]: Current;
};
```

To podstawa typowanych handlerów eventów, reducerów i command busów.

## Parsowanie stringa na poziomie typu

Template literal types z `infer` potrafią rozbić trasę na segmenty i zbudować typ
parametrów. Rekurencja powinna mieć wyraźny przypadek końcowy oraz fallback dla
zwykłego `string`, którego zawartości kompilator nie zna.

## Unia → przecięcie

`DeepPick<T, "a.b" | "a.c">` najpierw tworzy osobny kształt dla każdej ścieżki,
a potem scala unię tych kształtów w przecięcie. Końcowe mapowanie normalizuje
przecięcia do czytelnego typu obiektowego.

## Kiedy używać

- przy generowaniu API handlerów z unii eventów lub komend,
- w małych, zamkniętych systemach tras i selekcji pól,
- gdy jeden typ domenowy ma być źródłem kilku pochodnych kontraktów.

## Kiedy unikać

- gdy prosty jawny typ jest krótszy i łatwiejszy do diagnozowania,
- dla bardzo dużych unii stringów — lepsze może być generowanie kodu,
- gdy typ zaczyna naśladować całą logikę runtime lub znacząco spowalnia kompilator.

## Pułapki

- warunkowy typ z nagim parametrem rozdziela się po unii,
- szeroki `string` wymaga fallbacku innego niż literał trasy,
- `Record<string, T>` gubi dokładne klucze i korelację wartości,
- rekurencja bez przypadku końcowego kończy się limitem instancjacji,
- przecięcia warto uprościć przed porównywaniem i wyświetlaniem w IDE.

Źródła: TypeScript Handbook — Mapped Types, Conditional Types i Template Literal
Types; repozytorium type-challenges, poziom medium.
