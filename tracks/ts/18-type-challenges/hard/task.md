# Hard - DeepPick dla selekcji pól API

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zaimplementuj `DeepPick<Model, Paths>`. `Paths` jest unią ścieżek z kropkami, a wynik
ma zawierać wyłącznie wskazane gałęzie modelu.

```ts
type Selected = DeepPick<
  User,
  "id" | "profile.name" | "profile.age" | "settings.theme"
>;
```

Wymagania:

- kilka ścieżek o wspólnym prefiksie ma scalić się w jeden obiekt,
- zachowaj `readonly` i opcjonalność właściwości źródłowych,
- ścieżki z różnych gałęzi mają tworzyć jeden wynik, nie unię wyników,
- nie używaj `any`,
- pomocnicze przecięcia znormalizuj do czytelnego kształtu obiektowego,
- typy liści takie jak `Date` zachowaj bez rozwijania ich metod.

Przyda się osobny typ dla jednej ścieżki, dystrybucja po unii `Paths` oraz technika
zamiany unii na przecięcie.
