# Definicja poziomu mid

Poziom mid w tym kursie oznacza powtarzalną samodzielność, nie znajomość każdej
funkcji biblioteki. Uczeń powinien umieć wykonać poniższe czynności bez gotowego
algorytmu i bez kopiowania rozwiązania z tutoriala.

## Kompetencje wspólne

| Obszar | Zachowanie końcowe | Dowód w kursie |
|---|---|---|
| Analiza | Rozbija niepełne wymaganie na kontrakty, dane, przypadki brzegowe i ryzyka | hard/module z niepełną specyfikacją oraz testami akceptacyjnymi |
| Implementacja | Buduje czytelne rozwiązanie wieloplikowe i zachowuje istniejące kontrakty | moduły oraz zadania refaktoryzacyjne |
| Debugowanie | Reprodukuje problem, lokalizuje przyczynę i dodaje test regresji | zadania `[D]` z realnymi klasami błędów |
| Testowanie | Dobiera test jednostkowy, integracyjny lub e2e do ryzyka | osobne zadania testowe i bramki modułów |
| Typy i dane | Modeluje poprawne i błędne stany bez ukrywania problemów przez `any`/assertions | TypeScript, granice runtime i walidacja |
| Wydajność | Najpierw mierzy, potem poprawia złożoność, alokacje lub I/O | zadania `[O]`, profile i plany zapytań |
| Niezawodność | Projektuje timeout, anulowanie, retry, idempotencję i graceful shutdown | JS/Node/Next/Strapi oraz moduły integracyjne |
| Bezpieczeństwo | Rozróżnia authn/authz, waliduje wejście, parametryzuje SQL i chroni sekrety | Next/Strapi/MySQL/combined |
| Dostępność | Używa semantycznego HTML, etykiet, klawiatury i komunikatów stanu | React/Next oraz testy Testing Library |
| Dokumentacja | Sprawdza aktualne API w źródle pierwotnym i zapisuje decyzję | zadania wymagające krótkiej notatki technicznej |
| Review | Potrafi wyjaśnić kompromisy i poprawić kod po uwagach bez przepisywania całości | checkpoint review po module |

## Kryteria per track

### JavaScript

- Swobodnie dobiera konstrukcje języka i struktury danych.
- Rozumie event loop, błędy asynchroniczne, anulowanie i limity współbieżności.
- Potrafi zdebugować mutację, race condition, leak i regresję wydajności.
- Organizuje kod modułowo i buduje małe biblioteki z jawnym API.

### TypeScript

- Modeluje domenę typami zamiast dopisywać adnotacje do JavaScriptu.
- Rozumie inferencję, wariancję, moduły, konfigurację i granicę compile-time/runtime.
- Pisze testy typów i diagnozuje koszt lub nadmierną złożoność typów.
- Używa zaawansowanych typów wtedy, gdy upraszczają API, nie dla samej sztuczki.

### React

- Projektuje stan, przepływ danych i granice komponentów.
- Traktuje efekty jako synchronizację z systemem zewnętrznym.
- Buduje dostępne formularze i stany async, testuje zachowanie użytkownika.
- Profiluje przed optymalizacją i rozumie wpływ React Compiler.

### Node.js

- Projektuje proces, I/O, strumienie i backpressure.
- Obsługuje sygnały, błędy, anulowanie, logowanie i graceful shutdown.
- Rozróżnia pracę I/O od CPU i dobiera worker, child process albo zwykły async.
- Pisze testy jednostkowe i integracyjne bez zależności od przypadkowego timingu.

### Next.js

- Świadomie wyznacza granice server/client i statyczne/cache/dynamic.
- Implementuje routing, streaming, Actions, Route Handlers, auth i rewalidację.
- Rozumie Cache Components oraz `proxy` w Next 16.
- Potrafi przetestować, obserwować i przygotować aplikację do wdrożenia.

### MySQL

- Projektuje schemat, constraints i transakcje zgodnie z niezmiennikami domeny.
- Pisze czytelne zapytania z joinami, CTE i funkcjami okienkowymi.
- Czyta `EXPLAIN ANALYZE`, dobiera indeksy i rozumie koszt zapisu.
- Rozpoznaje problemy izolacji, blokad, deadlocków i paginacji.

### Strapi

- Modeluje content types, relacje i workflow redakcyjny w Strapi 5.
- Używa `documentId`, Document Service, policies i middleware.
- Projektuje permissions jako allow-list i testuje API na poziomie HTTP.
- Integruje CMS z frontendem, rewalidacją, webhooks i bezpiecznym uploadem.

### Java

- W zakresie PJATK łączy podstawy języka z obiektowością, kolekcjami, I/O,
  współbieżnością, GUI, JDBC i siecią.
- Dla nowego kodu używa JDK 25 LTS, jednocześnie rozpoznając ograniczenia wersji
  wymaganej na zajęciach.

### Projekty łączone

- Dostarcza pionowy feature obejmujący UI, backend, dane, auth, testy i diagnostykę.
- Potrafi opisać architekturę, kompromisy, ryzyka i plan wdrożenia.
