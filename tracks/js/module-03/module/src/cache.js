export function createCache() {
  // TODO: cache oparty na Map, kluczowany parą (query, page).
  // Zwróć { has, get, set, size, clear }:
  //  - klucz buduj jednakowo, np. `${query}::${page}`
  //  - has(query, page) / get(query, page) — sprawdź / odczytaj wpis
  //  - set(query, page, value) — zapisz i zwróć value
  //  - size (getter) — liczba wpisów; clear() — wyczyść
}
