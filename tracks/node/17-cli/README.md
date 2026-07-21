# Narzędzia CLI

Dobre CLI to interfejs programowalny — jego użytkownikiem bywa człowiek,
ale równie często pipe, cron i skrypt CI. Stąd trzy twarde konwencje:

**Strumienie mają role.** `stdout` niesie **wynik** (to, co można przekazać
dalej pipe'em), `stderr` — diagnostykę, błędy i pomoc. Pomieszanie ich psuje
kompozycję: `narzędzie | jq` dostaje nagle komunikat błędu w danych.

**Exit codes to API.** `0` = sukces, `1` = błąd wewnętrzny, `2` = błąd
użycia/danych wejściowych (konwencja wielu narzędzi UNIX). Skrypty wołające
twoje CLI podejmują decyzje po kodzie wyjścia, nie po treści komunikatu.

**NDJSON do przetwarzania strumieniowego.** Jeden JSON na linię pozwala
przetwarzać pliki dowolnego rozmiaru linia po linii. Parser strumieniowy
raportuje **numer linii** błędu (świętość przy debugowaniu cudzych danych),
pomija puste wiersze i jest leniwy — generator wydaje rekordy w miarę
czytania, zamiast ładować całość.

Komunikaty błędów są bezpieczne domyślnie: `error.cause` i szczegóły
wewnętrzne pokazuj tylko w trybie debug; standardowo — komunikat plus
wskazówka `--help`.

## Kiedy używać

- Każde narzędzie wewnętrzne zespołu — konwencje czynią je komponowalnym.
- Wymiana danych między narzędziami: NDJSON zamiast wielkiego JSON-a.
- Formatowanie `--json` dla maszyn i tekstowe dla ludzi — przełączane flagą.

## Kiedy unikać

- Nie pisz diagnostyki na stdout "bo tak prościej" — to psuje pipe'y
  w sposób, który wychodzi dopiero u użytkownika.
- Nie zwracaj kodu 1 dla błędnych danych wejściowych użytkownika — to kod 2;
  jedynka mówi "to nasza wina".
- Nie drukuj stack trace'ów w trybie normalnym.

## Pułapki

- `console.log` pisze na stdout — logi diagnostyczne w CLI wymagają
  `console.error` albo jawnego `process.stderr`.
- Wynik tekstowy i JSON też kończą się `\n` — brak nowej linii skleja
  wyjście z promptem i psuje `tail`/`grep`.
- Parser NDJSON: licz linie od 1 i licz **wszystkie** (także puste
  pomijane) — inaczej raportowany numer nie zgadza się z edytorem.
- Błąd parsowania w linii N nie może wyrzucać rekordów z linii < N —
  leniwy generator już je wydał i to jest poprawne.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [process.exitCode](https://nodejs.org/download/release/latest-v24.x/docs/api/process.html#processexitcode_1)
- [readline](https://nodejs.org/download/release/latest-v24.x/docs/api/readline.html)
- [NDJSON](https://github.com/ndjson/ndjson-spec)
