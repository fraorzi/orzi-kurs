# Moduł - strumieniowy analizator logów NDJSON

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Zadanie jest **wieloplikowe**. Uzupełnij pliki w `src/`; testy importują
wyłącznie z `src/index.ts`. `src/types.ts` jest gotowym kontraktem -
nie zmieniaj go.

Operacje dostają wielogigabajtowe logi NDJSON. Analizator ma policzyć
rekordy per poziom logu, tolerować ograniczoną liczbę zepsutych linii
i respektować limity - w stałej pamięci, bez wczytywania całości.

## `src/lines.ts` - framing linii

`lines(chunks: AsyncIterable<Uint8Array>): AsyncGenerator<NumberedLine>`

- dekoduj UTF-8 przez `StringDecoder` - znak przecięty między chunkami nie
  może stać się znakiem zastępczym;
- wydawaj linie z numerem (od 1, licząc **wszystkie** wiersze) bez `\n`
  i bez końcowego `\r`;
- ostatnia linia bez newline też jest linią; pustej końcówki nie wydawaj.

## `src/records.ts` - walidacja rekordu

`parseRecord(text: string): LogRecord`

- rekord to obiekt JSON z polami `level` (z `LOG_LEVELS`) i `message`
  (niepusty string); dodatkowe pola ignoruj (nie przepisuj ich do wyniku);
- każdy inny kształt (zły JSON, tablica, zły level, brak message) to
  `Error` z czytelnym powodem.

## `src/analyze.ts` - analiza z limitami

`analyzeLog(chunks, options): Promise<AnalyzeResult>`

- licz bajty chunków; przekroczenie `maxTotalBytes` przerywa analizę
  błędem **bez dociągania kolejnych chunków**;
- linie puste/białe pomijaj (numeracja liczy je nadal);
- linię dłuższą niż `maxLineBytes` (w bajtach) odnotuj jako błąd
  `"line-too-long"` - zużywa budżet, treści nie parsuj;
- niepoprawny rekord odnotuj jako błąd z powodem z `parseRecord`;
- każdy błąd zużywa `maxParseErrors`; przekroczenie budżetu przerywa
  analizę błędem;
- przed obsłużeniem każdej linii sprawdź `options.signal` - przerwany
  sygnał odrzuca analizę jego `reason`;
- wynik: `processed` (poprawne rekordy), `counts` per level,
  `parseErrors` (numer linii + powód).

## `src/index.ts` - publiczna granica

Gotowy plik re-eksportuje `analyzeLog`, `lines`, `parseRecord` i typy.

## Kryteria akceptacji

- stała pamięć: żadnego `Buffer.concat` całości ani tablicy wszystkich linii,
- limity liczone w bajtach,
- testy przechodzą bez modyfikacji.
