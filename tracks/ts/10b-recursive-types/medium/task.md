# Medium — typowane ścieżki konfiguracji

Zaimplementuj:

- `Paths<T>` — unię ścieżek oddzielonych kropką dla zagnieżdżonych obiektów,
- `PathValue<T, P>` — typ wartości pod ścieżką,
- `getAtPath(object, path)` — runtime odczyt zgodny z tym kontraktem.

Tablice są traktowane jako wartości końcowe; nie generuj indeksów typu `"items.0"`.
Nieznana ścieżka ma być błędem kompilacji.

Przykład:

```ts
type P = Paths<AppConfig>;
// "server" | "server.host" | "server.port" | "features" | ...

getAtPath(config, "server.port"); // number
```
