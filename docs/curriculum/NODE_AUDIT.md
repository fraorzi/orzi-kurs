# Audyt tracka Node.js

Data: 2026-07-17. Cel: Node.js 24 LTS i `@types/node` 24.

## Wynik

Track ma 20 tematów, dwa moduły i 62 zadania TypeScript. Prowadzi od rozumienia
runtime’u do bezpiecznej obsługi produkcyjnej, a nie tylko od API do API.

| Etap | Zakres |
|---|---|
| Runtime | ESM/CJS, package exports, natywny TypeScript, process/env/argv, URL/path/fs |
| Dane i async | bufory/UTF-8, events, AbortSignal, event loop, AsyncLocalStorage |
| Sieć | odporny fetch, HTTP server, limity body, klasyczne i Web Streams, kompresja |
| Izolacja i testy | child processes, workers, protokoły IPC, `node:test`, fixture’y i port 0 |
| Produkcja | crypto, sekrety, shutdown, obserwowalność, permissions, CLI, debug i optymalizacja |
| Elective | SQLite i WebSocket jako rozszerzenia, nie blokada głównego core |
| Moduły | bounded NDJSON analyzer i idempotentny rdzeń usługi HTTP |

Każde zadanie ma zastosowania, pułapki, źródło Node 24, starter, rozwiązanie,
test i progresywne hinty. Zadania sieciowe wstrzykują zależności lub używają portu 0;
zadania wydajnościowe mierzą liczbę operacji, współbieżność albo event-loop delay
zamiast polegać wyłącznie na kruchym czasie ściennym.

## Weryfikacja

- 62/62 rozwiązań przechodzi pełny pipeline,
- 62/62 pierwotnych starterów ma poprawną bramkę,
- kompletność i kolejność przechodzi `pnpm audit:curriculum`.

## Źródła pierwotne

- [Node.js 24 API](https://nodejs.org/docs/latest-v24.x/api/)
- [Cykl i status wydań Node](https://nodejs.org/en/about/previous-releases)
- [Natywna obsługa TypeScript](https://nodejs.org/docs/latest-v24.x/api/typescript.html)
- [Node test runner](https://nodejs.org/docs/latest-v24.x/api/test.html)
- [Permission Model](https://nodejs.org/docs/latest-v24.x/api/permissions.html)
