# Walidacja, błędy API i transakcje

TypeScript sprawdza typy w czasie kompilacji — `unknown` z sieci wciąż
trzeba zweryfikować w runtime. Strapi radzi sanitizować i walidować
wejście i wyjście kontrolerów jawnie (`strapi.contentAPI.sanitize.input`,
`validate.query` itd.), bo framework nie zgadnie za Ciebie kształtu
body, którego jeszcze nie widział.

Błędy API w Strapi mają stały kontrakt: `{ error: { status, name, message,
details } }`. Wbudowane klasy (`ApplicationError`, `ValidationError`,
`NotFoundError`, `ForbiddenError`, `UnauthorizedError`,
`PayloadTooLargeError`) mapują się na konkretne statusy HTTP. Budując
własną warstwę błędów domenowych, trzymaj się tej samej dyscypliny:
**znany** błąd (not-found, konflikt, walidacja) dostaje stabilny status
i publiczny kod; **każdy inny** — w tym literówka w `kind` i wszystko,
czego nie przewidziałeś — musi spaść do generycznego 500 bez ujawniania
`error.message`. Surowa treść wyjątku (zapytanie SQL, ścieżka pliku,
hasło z connection stringa) nie jest przeznaczona dla klienta.

`strapi.db.transaction()` grupuje kilka operacji tak, by zacommitować
razem albo wycofać razem. To (obecnie eksperymentalne) API automatycznie
propaguje transakcję do wywołań Document Service i `strapi.db.query`
wewnątrz handlera — ale gdy budujesz własny, ręczny odpowiednik (update +
audit jako jedna jednostka), odpowiedzialność za `commit`/`rollback` w
odpowiednim miejscu spoczywa na Twoim kodzie: **jeden** `try/catch`
obejmujący wszystkie zależne zapisy, `rollback` w `catch`, `commit`
tylko po sukcesie wszystkich.

## Kiedy używać

- Walidacja przed zapisem: zawsze, gdy kontroler dostaje dane spoza
  systemu (body HTTP, webhook, import).
- Mapowanie błędów: na granicy między logiką domenową a odpowiedzią HTTP,
  żeby klient dostał stabilny kontrakt zamiast surowego `error.stack`.
- Transakcje: gdy zapis obejmuje więcej niż jedną tabelę/kolekcję i błąd
  połowiczny zostawiłby dane w niespójnym stanie.

## Kiedy unikać

- Nie polegaj wyłącznie na typach TypeScript jako walidacji runtime —
  `as Type` nic nie sprawdza, tylko zmienia widok kompilatora.
- Nie zwracaj `error.message` bezpośrednio do klienta „bo szybciej” —
  nawet `ApplicationError` powinien nieść komunikat bezpieczny do publikacji.
- Nie owijaj w transakcję operacji niezależnych od siebie — koszt blokad
  i połączeń przewyższa korzyść, gdy nic naprawdę nie musi być atomowe.

## Pułapki

- Kolejność strażników walidacji ma znaczenie — sprawdzaj kształt obiektu,
  zanim odczytasz z niego jakiekolwiek pole.
- `trim()` przed sprawdzeniem długości — string z samych spacji nie jest
  poprawnym tytułem.
- `rollback()` musi się wykonać przed ponownym rzuceniem błędu, nie po —
  odwrócona kolejność zostawia transakcję otwartą.
- Nieznany `kind`/typ błędu to wciąż 500, nie domyślne uznanie za
  "poprawny, po prostu nieznany" przypadek.

## Źródła (audyt 2026-07-20, Strapi 5)

- [Controllers: sanitization and validation](https://docs.strapi.io/cms/backend-customization/controllers#sanitization-and-validation-in-controllers)
- [Error handling](https://docs.strapi.io/cms/error-handling)
- [Database transactions](https://docs.strapi.io/cms/database-transactions)
