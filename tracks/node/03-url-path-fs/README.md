# URL, ścieżki i bezpieczny system plików

W ESM nie ma `__dirname`. Tożsamością modułu jest `import.meta.url` —
**URL typu `file:`**, nie ścieżka. Pliki względem modułu rozwiązujesz
konstruktorem `new URL(relative, base)`, a na ścieżkę systemową konwertujesz
przez `url.fileURLToPath`. Ręczne sklejanie stringów z `/` psuje się na
Windowsie i przy znakach specjalnych.

## Dwie osie bezpieczeństwa plików

**Path traversal.** Każda ścieżka pochodząca od użytkownika (nazwa pliku
z requestu, parametr CLI) może zawierać `..` albo być absolutna. Kontrakt
bezpiecznego resolvera:

1. `resolve(root)` i `resolve(root, input)` — normalizacja usuwa `..`;
2. kandydat musi być identyczny z rootem **albo** zaczynać się od
   `root + sep`. Sam `startsWith(root)` nie wystarcza: `/data-evil`
   przechodzi tekstowy prefiks `/data`.

**Zapis atomowy.** `writeFile` bezpośrednio do celu zostawia po awarii plik
zapisany w połowie. Wzorzec produkcyjny: zapisz do pliku tymczasowego obok celu,
`fsync` uchwyt, zamknij, dopiero potem `rename` — na tym samym systemie plików
rename jest atomowy, więc czytelnicy widzą zawsze starą albo nową wersję,
nigdy pół pliku. Po błędzie posprzątaj plik tymczasowy.

## Kiedy używać

- Wczytywanie zasobów względem modułu (fixtures, szablony, migracje).
- Serwowanie albo zapisywanie plików o nazwach pochodzących z zewnątrz.
- Każdy zapis configu/stanu, który musi przetrwać crash w trakcie.

## Kiedy unikać

- Nie buduj ścieżek konkatenacją stringów z separatorem.
- Nie używaj `__dirname`-owych nawyków CJS w kodzie ESM.
- Nie sprawdzaj bezpieczeństwa ścieżki przed jej normalizacją.

## Pułapki

- `new URL("plik.txt", base)` a `new URL("./plik.txt", base)` to to samo, ale
  base **musi** kończyć się nazwą pliku lub `/` — względem `file:///app`
  i `file:///app/` wynik jest inny.
- `resolve(base, input)` z absolutnym `input` po prostu zwraca `input` —
  dokładnie dlatego walidacja prefiksu musi być po resolve.
- Plik tymczasowy twórz z flagą `"wx"` (błąd, gdy istnieje), a rename wykonuj
  dopiero po `sync()` i `close()` — inaczej dane mogą siedzieć w buforze OS.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [URL](https://nodejs.org/download/release/latest-v24.x/docs/api/url.html)
- [Path](https://nodejs.org/download/release/latest-v24.x/docs/api/path.html)
- [File system](https://nodejs.org/download/release/latest-v24.x/docs/api/fs.html)
