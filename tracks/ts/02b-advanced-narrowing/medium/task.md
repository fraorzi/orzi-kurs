# Medium - bezpieczne ładowanie konfiguracji

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Dane środowiskowe przychodzą jako `unknown`. Zaimplementuj assertion function
`assertRuntimeConfig`, która po sukcesie zawęża wartość do:

```ts
type RuntimeConfig = {
  apiUrl: string;
  port: number;
  mode: "development" | "production";
};
```

Warunki:

- obiekt, nie `null` ani tablica,
- `apiUrl` jest niepustym stringiem,
- `port` jest liczbą całkowitą od 1 do 65535,
- `mode` ma jedną z dwóch dozwolonych wartości.

Przy błędzie rzuć `TypeError` z nazwą niepoprawnego pola. `loadRuntimeConfig` ma
wywołać asercję i zwrócić nowy obiekt z `apiUrl` bez końcowego ukośnika.
