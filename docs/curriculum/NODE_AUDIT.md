# Audyt curriculum Node

Data audytu: 2026-07-17. Branch: `feature/curriculum-node` (quality pass).

## Wniosek

Pierwsza wersja tracka Node miała poprawny zakres tematyczny i solidne
rozwiązania wzorcowe, ale treść dydaktyczną poniżej standardu pozostałych
tracków: szkieletowe README (~14 linii), jednozdaniowe polecenia,
pojedynczy test "spełnia kontrakt zadania" na zadanie oraz identyczne,
generyczne hinty skopiowane do 54 z 61 zadań. Testy nie wymuszały sedna
tematów (np. backpressure przechodził bez czekania na `drain`), a "moduły"
były jednoplikowymi zadaniami.

Quality pass zachował zakres i rozwiązania (poprawiane tylko tam, gdzie
wymagały tego lint/typy), a przepisał warstwę dydaktyczną w całości.

## Zakres quality passu

- **README (20 tematów)**: model mentalny, przykłady decyzji, sekcje
  "Kiedy używać / Kiedy unikać / Pułapki / Źródła" z linkami do
  dokumentacji Node 24 i datą audytu.
- **Polecenia**: kontekst produkcyjny, jawna lista wymagań i przypadków
  brzegowych; usunięta wklejka powtarzana we wszystkich zadaniach.
- **Testy**: 3–5 nazwanych testów zachowania na zadanie; bramki wymuszają
  sedno tematu (oś czasu `drain` w backpressure, brak dociągania chunków
  po limicie, izolacja kontekstów ALS, brak wycieku szczegółów w envelope
  500, `timingSafeEqual` w porównaniach sekretów).
- **Hinty**: trzy progresywne, specyficzne dla zadania.
- **Moduły**: `module-01` (strumieniowy analizator NDJSON: framing +
  StringDecoder, limity bajtów, budżet błędów, AbortSignal) i `module-02`
  (rdzeń usługi HTTP na Request/Response: routing z 405/Allow, limit body,
  idempotency-key, request ID, bezpieczne błędy) przebudowane na
  wieloplikowe `module/src` + `_solution` zgodnie z konwencją repo.
- **Kontrakt treści** (`harness/node-content.test.ts`): wymusza sekcje
  i minimalną objętość README, ≥3 testy na zadanie (≥6 dla modułów),
  ≥3 hinty, **unikalność plików hints.md** oraz znaczniki `[quality]`
  w zadaniach `[O]`.

## Decyzje

- Zadania `[O]` (temat 18) zachowują bramkę: starter poprawny funkcjonalnie,
  czerwone tylko `[quality]` mierzone licznikami (praca, szczyt in-flight,
  liczba listenerów) — nigdy czasem zegarowym.
- Tam, gdzie efektu nie widać w runtime testu (unref timera, użycie
  `timingSafeEqual`/`scrypt`), test kontraktowy czyta źródło startera —
  ta sama technika co w tracku Next dla `use cache`.
- Testy wykonują się na lokalnym Node 22; semantyka wyłącznie-Node-24
  (Permission Model, natywny TS) jest uczona przez teorię i czyste funkcje
  budujące kontrakty, nie przez odpalanie tych mechanizmów w testach.
- SQLite i WebSocket pozostają elective (19–20) — ukończenie rdzenia
  nie zależy od nich.

## Macierz końcowa

- `verify:solutions node`: 62/62,
- `verify:starters node`: 62/62 (w tym bramki [O]),
- harness: 61/61, root lint i `tsc --noEmit` czyste,
- regresje js/ts/react/next: bez zmian.

## Źródła bazowe

- [Node.js 24 API](https://nodejs.org/download/release/latest-v24.x/docs/api/)
- [Node.js Learn: event loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)
- [Backpressuring in streams](https://nodejs.org/en/learn/modules/backpressuring-in-streams)
- [NDJSON spec](https://github.com/ndjson/ndjson-spec)
- [AWS: Exponential Backoff and Jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)
- [SQLite: transactions](https://sqlite.org/lang_transaction.html)
