# Capstone — wejdź w obcy kod i bezpiecznie napraw incydent

Zadanie jest **wieloplikowe**. Uzupełnij `src/handler.ts` (naprawa) oraz
`src/decision.ts` (notatka decyzyjna); `src/types.ts` i `src/index.ts` są
gotowe. To symulacja realnej pracy mida: dostajesz cudzy handler webhooka
z trzema błędami produkcyjnymi i masz go naprawić bez regresji, dokumentując
decyzję.

## Reprodukcja (trzy usterki w starterze)

1. **Utracony retry**: event jest oznaczany jako `seen` **przed** udanym
   `apply`. Gdy `apply` rzuci, event zostaje „przetworzony", a retry jest
   ignorowany — dane nigdy nie trafiają do systemu.
2. **N+1 fetch**: każdy dokument pobierany osobnym `fetchMany([id])` w pętli.
3. **Wyciek sekretu**: `log(event)` serializuje cały webhook z polem `secret`.

## Napraw `handler.ts`

- oznaczaj `seen` **dopiero po** udanym `apply` — retry po błędzie musi
  przetworzyć zdarzenie;
- pobierz dokumenty jednym `fetchMany` po unikalnych id, a `apply` dostaje
  wartości w kolejności `documentIds` (z duplikatami);
- loguj tylko bezpieczne pola (id zdarzenia, liczba dokumentów) — nigdy
  `secret`;
- zdarzenie już `seen` zwraca `false` bez efektów.

## Uzupełnij `decision.ts`

Notatka decyzyjna (jak w prawdziwym postmortem):

- `rootCause` (> 30 znaków): dlaczego retry ginął;
- `regressionTest`: opis testu chroniącego przed nawrotem (wspomnij retry);
- `rolloutMetric`: metryka do obserwacji po wdrożeniu (dotyczy webhooka);
- `rollbackWhen` (> 20 znaków): warunek cofnięcia zmiany.

## Kryteria akceptacji

- retry po awarii `apply` przetwarza zdarzenie,
- jeden `fetchMany`, kolejność i duplikaty zachowane,
- `secret` nie pojawia się w logu,
- notatka decyzyjna kompletna.
