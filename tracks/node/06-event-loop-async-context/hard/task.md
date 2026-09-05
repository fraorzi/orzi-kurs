# Hard - izoluj request ID w AsyncLocalStorage

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Logger i klienci HTTP trzy warstwy pod handlerem potrzebują ID bieżącego
żądania - bez przekazywania parametru przez każdą funkcję. Zaimplementuj
`solve()` zwracające API oparte na `AsyncLocalStorage`:

- `run(id, fn)` - wykonuje `fn` w kontekście `id` i zwraca jego wynik
  (także gdy `fn` jest asynchroniczne - kontekst ma przetrwać `await`);
- `current()` - zwraca ID bieżącego kontekstu; wywołane **poza** `run` rzuca
  `Error`, bo brak kontekstu to błąd programisty, nie stan do ukrycia;
- konteksty równoległych `run` są odizolowane, a zagnieżdżony `run`
  przysłania zewnętrzny tylko na czas swojego `fn`.
