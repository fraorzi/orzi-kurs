# Roadmapa intern → mid

Data audytu: 2026-07-16.

## Stan zastany

| Track | Stan | Najważniejsza obserwacja |
|---|---:|---|
| JavaScript | 51 tematów, 5 modułów, 158 zadań | Duże pokrycie języka; wymaga audytu priorytetów, aktualności i realnej wartości tematów zaawansowanych |
| TypeScript | 12 tematów, 1 moduł, 37 zadań | Dobra baza, ale curriculum i zależność 5.9 są nieaktualne wobec TS 6/7 |
| React | tylko plan | Zakres bliski oficjalnemu modelowi React 19.2, brak harnessu jsdom/Testing Library |
| Node.js | tylko plan | Brakuje test runnera, diagnostyki, sygnałów, bezpieczeństwa i operacyjności |
| Next.js | tylko plan | Plan sprzed modelu Next 16 Cache Components i zmiany middleware → proxy |
| MySQL | tylko plan | Dobra lista SQL, za mało izolacji, blokad, paginacji i migracji |
| Strapi | tylko plan | Plan nie uwzględnia dostatecznie Document Service i semantyki dokumentu w v5 |
| Java | plan na starym branchu | Zakres PJATK jest wartościowy, ale branch nie może być scalony z aktualnym main |
| Combined | 8 pomysłów | Brakuje jakości przekrojowej: CI, deployment, obserwowalność, security i accessibility |

Punkty odniesienia:

- `pnpm test:harness`: 31/31,
- `pnpm verify:solutions ts`: 37/37,
- pełna weryfikacja JS do ponowienia na branchu JavaScript.

Stan po ukończeniu pierwszych trzech etapów:

- fundament procesu zapisany i wypchnięty,
- JavaScript: 161/161 rozwiązań i 161/161 starterów,
- TypeScript: 95/95 rozwiązań i 95/95 starterów na TS 6 oraz TS 7,
- harness po kontrakcie treści React: 49/49,
- React: harness TSX z jsdom, Testing Library, user-event, Profiler i lintem
  hooków gotowy,
- React: bloki 01–18 oraz `module-01` mają 55 zadań obejmujących czyste komponenty, identity,
  architekturę stanu, dostępne formularze, efekty jako synchronizację, Effect Events,
  odporny ręczny fetch, refy i ID, reducer/context, jawne maszyny stanów oraz
  React 19 Actions, optimistic UI, Suspense/Error Boundary i external stores;
  55/55 rozwiązań i 55/55 starterów przechodzi właściwe bramki.

Postęp ucznia wskazuje początek ścieżki JavaScript. Audyty nie mogą resetować
`progress.json` ani starterów.

## Wersje docelowe

| Technologia | Cel |
|---|---|
| JavaScript | ECMAScript obsługiwany przez Node 24 LTS i współczesne przeglądarki; nowości oznaczane jako core lub elective |
| TypeScript | TS 7.0 jako aktualny cel, TS 6.0 jako wiedza migracyjna; istniejący harness 5.9 wymaga kontrolowanej migracji |
| React | React 19.2 i stabilny React Compiler 1.x |
| Node.js | Node 24 LTS; Node 22 jako obecne środowisko zgodności |
| Next.js | dokładna wersja repo z `node_modules/next/dist/docs/`, obecnie 16.2.10 |
| MySQL | MySQL 8.4 LTS; kompatybilność podstaw sprawdzana również lokalnie na 9.6 |
| Strapi | Strapi 5 |
| Java | JDK 25 LTS; osobne notatki zgodności z wymaganiami PJATK |

## Kolejność realizacji

1. Fundament procesu i kryteria jakości.
2. Audyt JavaScript — uczeń jest aktualnie w tym tracku.
3. Dokończenie TypeScript oraz migracja harnessu do bieżącej wersji.
4. React i rozszerzenie harnessu o jsdom, Testing Library, hook lint oraz pomiar renderów.
5. Node.js — daje fundament runtime przed bardziej złożonym Next i Strapi.
6. Next.js 16.
7. MySQL 8.4 LTS i adapter deterministycznych zadań SQL.
8. Strapi 5 i adapter testowej instancji.
9. Projekty łączone.
10. Java/PJATK jako osobna, niezależna ścieżka; może być realizowana wcześniej po
    zmianie priorytetu użytkownika.

Etapy 1–3 są ukończone. Etap React jest aktywny; infrastruktura, fundamenty,
escape hatches, architektura stanu, async UI React 19, Suspense i external stores
do pozycji 18 wraz z pierwszym modułem są gotowe.

Każdy punkt jest osobnym branchem. Następny branch powstaje z aktualnego fundamentu,
nie z niepowiązanego brancha tracka.

## Najważniejsze luki po pierwszym audycie

### JavaScript

- Rozdzielić core mid od elective: WeakRef, FinalizationRegistry, trampoliny i część
  świeżych API nie mogą blokować przejścia do TS/React.
- Zweryfikować, czy moduły wymagają projektowania API, testu regresji i decyzji
  architektonicznych, a nie tylko implementacji opisanej krok po kroku.
- Dodać jawne zadania o modułach ESM, kontraktach pakietu i analizie zastanego kodu,
  jeśli nie zostaną lepiej pokryte w Node.

### TypeScript

- Zaktualizować wersję i dodać migrację 5.9 → 6.0 → 7.0.
- Priorytet nadać granicom runtime, modułom, konfiguracji, wariancji i testom typów.
- Type challenges pozostawić jako egzamin pomocniczy, nie główny dowód poziomu mid.

### React

- Oprzeć kolejność na oficjalnych blokach: describing UI → interactivity → managing
  state → escape hatches → Actions/Suspense → performance.
- Dostępność i testowanie zachowania włączyć od pierwszych formularzy, nie dopiero
  na końcu.
- React Compiler uczyć przed ręczną memoizacją, a ręczne API jako kontrolowaną
  ucieczkę po pomiarze.

### Node.js

- Dodać `node:test`, package exports, sygnały, graceful shutdown, AbortSignal,
  diagnostykę, profiling, logowanie i bezpieczne przetwarzanie wejścia.
- Moduł końcowy ma działać na plikach większych od pamięciowego happy path i mieć
  scenariusz przerwania pracy.

### Next.js

- Zastąpić „middleware” przez `proxy`.
- Rozdzielić pobieranie świeżych danych, Cache Components, `use cache`, `cacheLife`,
  tagi, `updateTag`, `revalidateTag` i `revalidatePath`.
- Dodać nawigację i search params, optymalizacje zasobów, authn/authz, walidację,
  testy, instrumentację, wdrożenie i self-hosting.

### MySQL

- Uczyć na 8.4 LTS, a nie na szybko zmieniającej się linii Innovation.
- Dodać typy danych/DECIMAL, izolację, blokady, deadlocki, `EXPLAIN ANALYZE`,
  indeksy złożone, keyset pagination, migracje i backup/restore podstaw.

### Strapi

- Uczyć Strapi 5: płaskie odpowiedzi REST, `documentId`, Draft & Publish, locale
  i Document Service.
- Document Service middleware ma być domyślnym miejscem logiki dokumentu;
  lifecycle hooks trzeba opisać wraz z ich wielokrotnymi wywołaniami w v5.
- Dodać policies, custom routes, webhooks, upload security, testy HTTP i rewalidację
  frontendu.

### Kompetencje przekrojowe

- Każdy moduł UI: semantyka, klawiatura, focus, komunikaty błędów i pending.
- Każdy moduł backendowy: walidacja, authz, logowanie, timeout i kontrolowane zamknięcie.
- Każdy projekt końcowy: testy jednostkowe/integracyjne/e2e dobrane do ryzyka.
- Combined: CI, kontenery, konfiguracja środowisk, obserwowalność i plan wdrożenia.

## Źródła bazowe pierwszego audytu

- React Learn i API: <https://react.dev/learn>, <https://react.dev/reference/react>
- React Compiler: <https://react.dev/learn/react-compiler>
- Next 16 docs zainstalowane w repo oraz <https://nextjs.org/docs/app>
- Next Learn dashboard: <https://nextjs.org/learn/dashboard-app>
- TypeScript 6.0: <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html>
- TypeScript 7.0 announcement: <https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/>
- Node releases i API: <https://nodejs.org/en/about/previous-releases>, <https://nodejs.org/api/>
- MySQL 8.4 Reference Manual: <https://dev.mysql.com/doc/refman/8.4/en/>
- Strapi 5 docs: <https://docs.strapi.io/>
- MDN Curriculum: <https://developer.mozilla.org/en-US/curriculum/>
- Full Stack Open: <https://fullstackopen.com/en/>
- Exercism syllabus design: <https://exercism.org/docs/building/tracks/syllabus>

Źródła te wyznaczają zakres i kolejność, ale nie są zamkniętą listą.
