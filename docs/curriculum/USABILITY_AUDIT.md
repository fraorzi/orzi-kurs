# Audyt czytelności zadań i porównania rozwiązań

Data: 2026-09-05. Zakres: wszystkie 606 zadań w 8 kursach tego repo.
Java pozostaje w osobnym repozytorium i nie jest częścią tego audytu.
Wersje: React 19.2.4, Next 16.2.10, TypeScript 6.0.3,
Prettier 3.9.5, sql-formatter 15.8.2, testowy MySQL 8.4.10.
Testy wykonano na Node 22.22.0, wspieranym przez harness środowisku zgodności.

## Zmiany

- Każde polecenie podaje tryb pracy: od zera, uzupełnienie, naprawa,
  optymalizacja albo projekt. Gotowy kod w zadaniu naprawczym jest celowy.
- Polecenia z trudnymi terminami mają wyjaśnienia przy pierwszym użyciu.
  Wybrane zadania Reacta mają nowe opisy kroków i przykłady oczekiwanego wyniku.
- Karty profilu i pierwsze widoki pozostają do napisania od zera. Operacje koszyka,
  przenoszenie zadań, aktualizacje licznika, walidacja formularzy i obsługa klawiatury
  mają gotowy szablon oraz brakującą logikę do napisania.
- `ShoppingCart` używa testowalnych funkcji `increaseQuantity` i `removeItem`.
  Testy wykrywają mutowanie tablicy i obiektów oraz sprawdzają zachowanie referencji
  niezmienionych produktów. Poprzedni test przepuszczał mutację obiektów stanu.
- Pola propsów mają zwykłe deklaracje. Niemutowalne modele danych, tablice przyjmowane
  przez istniejące API i lekcje TypeScript o `readonly` zachowują swoje kontrakty.
- Zadania nie wymagają dopisywania ARIA. Formularze, zakładki i dialog mają gotowy HTML.
  Testy sprawdzają widoczne komunikaty, wartości, akcje, focus i wyniki. Dostępne
  elementy obecne w szablonie pozostają częścią gotowego interfejsu.

## Porównanie w UI

API zadania i strona zadania korzystają z jednej funkcji `formatComparison`.
Obie strony przechodzą przez te same ustawienia Prettiera z repo, z ujednoliconym
zawijaniem obiektów. SQL używa jednego formattera w trybie MySQL.
Pliki z wieloplikowych snapshotów są formatowane osobno, według rozszerzenia.

Formatowanie dotyczy wyłącznie wyświetlanej kopii. Zapis w `verifiedStarter`, pliki
ucznia i wynik zaliczenia pozostają bez zmian. Gdy parser odrzuci kod, obie strony
wracają do oryginalnego tekstu. Istotne różnice wewnątrz stringów i wyrażeń regularnych
pozostają widoczne.

## Aktualizowanie starterów

Poprawione szablony są zapisane jako `_starter.tsx` lub katalog `_starter/`.
Reset i `verify:starters` korzystają z nich przed historycznym fallbackiem Git.
Dzięki temu nowa wersja zadania nie przywraca starego błędu z pierwszego commita.
Reset i cofanie resetu obsługują również TSX i JSX.

Nietknięte startery zaktualizowano tylko po porównaniu ich z pierwotną wersją i
sprawdzeniu braku wpisu w postępie. Wszystkie pliki rozpoczętych zadań i `progress.json`
zachowały identyczne bajty. Istniejący kod ucznia można zachować; nowy szablon jest
też dostępny przez reset kodu z możliwością cofnięcia.

## Weryfikacja

| Kurs | Rozwiązania | Bramki starterów |
| --- | ---: | ---: |
| JavaScript | 161/161 | 161/161 |
| TypeScript | 95/95 | 95/95 |
| React | 99/99 | 99/99 |
| Next.js | 62/62 | 62/62 |
| Node.js | 62/62 | 62/62 |
| MySQL | 68/68 | 68/68 |
| Strapi | 46/46 | 46/46 |
| Combined | 13/13 | 13/13 |
| Razem | 606/606 | 606/606 |

MySQL działał na osobnej instancji w katalogu tymczasowym, zamkniętej po testach.
Nie uruchamiano serwera developerskiego Next ani buildu pobierającego fonty.
Dodatkowe kontrole: `pnpm test:harness`, `pnpm lint`, `pnpm exec tsc --noEmit`
i `pnpm audit:curriculum`.

Test integracyjny wywołuje prawdziwy handler API i komponent strony z tym samym
zapisanym rozwiązaniem, a następnie porównuje tekst obu stron i sprawdza zachowanie
oryginalnego snapshotu. Testy formattera obejmują JS, TS, TSX, SQL, pliki mieszane,
różnice znaczące oraz błędną składnię. Kontrakt curriculum wykrywa brak trybu pracy,
brak testów i asercji, wymagania ARIA oraz modyfikatory `readonly` pól propsów.

## Źródła

- [Prettier API](https://prettier.io/docs/api): formatowanie tekstu oraz odczyt konfiguracji pliku.
- [Prettier options](https://prettier.io/docs/options): `objectWrap` i `printWidth`.
- [SQL Formatter](https://github.com/sql-formatter-org/sql-formatter): dialekt MySQL i ograniczenia parsera.
- [React: Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state):
  nowe tablice i kopie zmienianych obiektów.
- [Testing Library: About Queries](https://testing-library.com/docs/queries/about/):
  sprawdzanie elementów przez treść, etykiety i zachowanie widoczne dla użytkownika.
- Lokalne docs Next 16.2.10: `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`.
