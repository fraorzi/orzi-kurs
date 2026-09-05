# Hard - typowany facade nad legacy store

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

`legacy-store.js` jest istniejącą implementacją key-value. Uzupełnij jej `.d.ts`,
a następnie wystaw przez `settings.ts` wąski, typowany moduł ustawień.

Deklaracja store ma wiązać klucz z typem wartości:

```ts
get<K extends keyof State>(key: K): State[K]
set<K extends keyof State>(key: K, value: State[K]): void
snapshot(): Readonly<State>
```

`createSettings` przyjmuje początkowy `SettingsState` i zwraca metody `get`, `set`
oraz `snapshot`. Wynik snapshot nie może pozwalać na mutację w typach ani runtime.
