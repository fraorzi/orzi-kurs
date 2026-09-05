# Medium - konfiguracja jako żywe wiązanie

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Zbuduj moduł konfiguracji środowiska:

- `config.js` eksportuje zmienną `environment`, początkowo `"development"`, oraz
  `setEnvironment(next)`. Dozwolone wartości to `"development"`, `"test"` i
  `"production"`; dla innej rzuć `TypeError("Unknown environment: <wartość>")`.
- `api.js` importuje `environment` i eksportuje `apiUrl(path)`. Hosty:
  - development → `http://localhost:3000`,
  - test → `http://localhost:4000`,
  - production → `https://api.example.com`.
- `apiUrl` ma normalizować ścieżkę tak, aby wynik zawierał dokładnie jeden `/`
  między hostem i ścieżką.
- `index.js` re-eksportuje `environment`, `setEnvironment` i `apiUrl`.

Najważniejsza bramka: po `setEnvironment("production")` już zaimportowane `apiUrl`
ma użyć hosta produkcyjnego. Nie zapisuj kopii `environment` na poziomie `api.js`.
