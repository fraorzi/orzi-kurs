# Moduł 01 — typowany moduł użytkowników

Pierwszy duży sprawdzian tracka `ts`. Łączy wszystko z zagadnień 01–12:

- stałe `as const` i typy z nich wyprowadzone (`Role`),
- unia rozłączna jako wynik operacji (`Result`) zamiast wyjątków i `null`-i,
- walidacja `unknown` na granicy modułu (strażniki typu, „parse, don't validate”),
- utility types do wyprowadzania kształtów pochodnych (`Omit`, `Partial`, `Record`),
- klasa z prawdziwie prywatnym stanem (`#`) i wstrzykniętym zegarem (determinizm testów),
- niemutowalne aktualizacje (`readonly`, kopia zamiast zapisu).

Zadanie jest **wieloplikowe**: uzupełniasz pliki w `src/`, testy importują z `src/index`.
Publiczne API musi zgadzać się co do nazw.

## Dlaczego `Result` zamiast wyjątku

Wyjątek jest niewidoczny w typie funkcji — kompilator nie zmusi Cię do jego obsłużenia.
Unia rozłączna zmusza:

```ts
const created = repo.create(input);
created.value;          // błąd: property 'value' does not exist on type Result<User>
if (created.ok) {
  created.value;        // User
} else {
  created.error;        // string[]
}
```

Wyjątki zostają dla sytuacji naprawdę wyjątkowych (błąd programisty), a nie dla
przewidywalnych porażek walidacji.

## Dlaczego wstrzyknięty zegar

`new Date().toISOString()` w środku metody czyni testy niedeterministycznymi. Zegar
wstrzyknięty w konstruktorze (`now: () => string`) sprawia, że w testach podajesz stałą
funkcję, a w produkcji prawdziwy zegar. To ten sam ruch, co wstrzykiwanie `fetch`
w kliencie API.

## Struktura

```
src/
├─ types.ts        # Role, User, NewUser, UserPatch, Result
├─ validate.ts     # strażniki + parseNewUser (unknown → Result)
├─ repository.ts   # UserRepository (klasa, #private stan)
└─ index.ts        # publiczne API modułu (re-eksporty)
```
