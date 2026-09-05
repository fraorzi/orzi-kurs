# Rejestruj telemetry i twórz bezpieczne logi

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `registerRuntimeInstrumentation`. Dla `nodejs` załaduj tylko adapter
Node, dla `edge` tylko Edge, a dla nieznanego runtime nic. Zaczekaj na loader i
wywołaj zwrócone `register` dokładnie raz.

Zaimplementuj też `createRequestLog`. Zwróć tylko `requestId`, method, pathname bez
query, status, zaokrąglone nieujemne `durationMs` i opcjonalny stabilny `errorCode`.
Nie kopiuj nagłówków ani URL z query.
