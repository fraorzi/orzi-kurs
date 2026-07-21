# Bezpieczeństwo procesu: Permission Model i limity zasobów

Dwie warstwy obrony usługi Node — jedna na poziomie procesu, druga na
poziomie danych.

## Permission Model

Node ma wbudowany model uprawnień: flaga `--permission` odcina procesowi
dostęp do systemu plików, spawn-owania procesów, workerów itd.; kolejne
flagi jawnie przywracają minimum:

- `--allow-fs-read=/ścieżka`, `--allow-fs-write=/ścieżka` — per ścieżka,
- `--allow-child-process`, `--allow-worker` — per zdolność.

Zasada najmniejszych uprawnień obowiązuje dosłownie: brak potrzebnej ścieżki
w konfiguracji to **błąd wdrożenia do naprawienia**, a nie powód, żeby
dopisać `--allow-fs-read=*`. Narzędzie budujące argv procesu koduje tę
politykę — dlatego testuje się je jak zwykłą funkcję.

## Limity zasobów wejścia

Każde wejście z zewnątrz (request, rekord kolejki, plik od użytkownika) musi
mieć ograniczenia zanim zacznie kosztować: długość tekstu **w bajtach**,
zakres wartości liczbowych, allow-lista typów, głębokość i rozmiar struktur.
Walidator zwraca wąski, czysty obiekt — nie przepuszcza dodatkowych pól
wejścia dalej.

Ta sama dyscyplina dotyczy logów i diagnostyki: serializowanie cudzych
struktur bez limitu głębokości/rozmiaru to wektor DoS i wycieków. Bezpieczny
serializator kopiuje do zadanej głębokości, redaguje wrażliwe klucze
(`token|secret|password|authorization`), ogranicza tablice i **jawnie
oznacza** przycięcia (`[TRUNCATED]`), żeby czytelnik logu wiedział, że
czegoś brakuje.

## Kiedy używać

- `--permission` w usługach o wąskim kontrakcie plikowym (workery, sandboxy,
  narzędzia CI).
- Limity wejścia na każdej granicy zaufania — HTTP, kolejka, IPC, pliki.
- Bezpieczna serializacja wszędzie tam, gdzie logujesz cudze dane.

## Kiedy unikać

- Nie traktuj Permission Model jako substytutu izolacji OS/kontenera —
  to obrona w głąb, nie jedyna warstwa.
- Nie walcz z limitami przez ich podnoszenie na żądanie klienta.
- Nie loguj "całego obiektu na wszelki wypadek".

## Pułapki

- Limit tekstu licz w bajtach (`Buffer.byteLength`), nie znakach — 1024
  znaki UTF-8 potrafią mieć 4 KB.
- `typeof value === "number"` przepuszcza `NaN` i `Infinity` —
  `Number.isFinite` jest częścią walidacji.
- Redakcja po nazwie klucza musi obejmować `authorization` — nagłówki
  autoryzacyjne to najczęstszy wyciek w logach HTTP.
- Znacznik przycięcia jest częścią kontraktu — ciche ucinanie danych
  w diagnostyce myli ludzi w środku incydentu.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [Permissions](https://nodejs.org/download/release/latest-v24.x/docs/api/permissions.html)
- [Buffer.byteLength](https://nodejs.org/download/release/latest-v24.x/docs/api/buffer.html#static-method-bufferbytelengthstring-encoding)
