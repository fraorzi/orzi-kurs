# Audyt curriculum TypeScript

Data audytu: 2026-07-16.

## Wniosek

Zastany track dobrze uczy podstaw systemu typów, ale nie wystarcza jako przejście
od wiedzy internowej do samodzielności mida. Największe luki dotyczą pracy na
granicach runtime, projektowania kontraktów modułów, konfiguracji kompilatora,
diagnostyki złożonych typów oraz bezpiecznej migracji istniejącego projektu.

Po realizacji audytu track prowadzi od aktywnego pisania podstawowych typów do
samodzielnego projektowania kontraktów modułów, granic runtime i bezpiecznych
przepływów asynchronicznych. Type challenges pozostały egzaminem pomocniczym,
a nie substytutem pracy z prawdziwym publicznym API.

## Stan wejściowy

- 12 tematów językowych, 1 moduł praktyczny i 37 zadań.
- 37/37 rozwiązań przechodziło na TypeScript 5.9.3.
- Każdy istniejący temat miał rozbudowane README, a zadania zawierały starter,
  rozwiązanie, testy i podpowiedzi.
- Brakowało jawnej macierzy zgodności z TS 6 i TS 7.

## Strategia wersji

Repo używa TypeScript 6.0.3 jako głównego pakietu narzędziowego, ponieważ aktualny
`typescript-eslint` 8.64 wspiera TypeScript poniżej 6.1. Natywny TypeScript 7.0.2
jest zainstalowany równolegle pod aliasem `typescript7` i uruchamiany jako osobna
bramka CLI.

To odpowiada aktualnej ścieżce migracji:

1. usunąć deprecjacje i błędy na TS 6,
2. zachować TS 6 dla narzędzi korzystających z programistycznego API kompilatora,
3. uruchamiać TS 7 równolegle do kontroli kodu i konfiguracji,
4. przełączyć cały toolchain dopiero po uzyskaniu wsparcia jego zależności.

Pierwszy pełny przebieg TS 6 wykrył `baseUrl` w tymczasowym tsconfigu harnessu.
Konfiguracja została poprawiona przez użycie bezpośredniej ścieżki w `paths`, bez
wyciszania diagnostyki.

## Końcowy wynik migracji i rozbudowy

| Bramka | TypeScript 6.0.3 | TypeScript 7.0.2 |
|---|---:|---:|
| rozwiązania | 95/95 | 95/95 |
| startery | 95/95 | 95/95 |

Startery są sprawdzane jako oczekiwane czerwone bramki i nie nadpisują bieżącej
pracy ucznia. Dodatkowo harness ma 42/42 zielone testy, root lint nie zgłasza
błędów, a root `tsc --noEmit` przechodzi bez diagnostyki.

## Zrealizowany zakres

### Fundamenty potrzebne w codziennej pracy

- zaawansowane narrowing, predykaty, assertion functions i exhaustive checks,
- structural typing, excess property checks i nominalne identyfikatory,
- `keyof`, `typeof`, indexed access oraz bezpieczny dostęp do konfiguracji,
- `const` type parameters, `NoInfer` i kontrakty funkcji wyższego rzędu,
- tuple etykietowane i wariadyczne.

### Samodzielność mida

- granice runtime: `unknown`, walidacja i mapowanie błędów z zewnętrznych danych,
- moduły, declaration files, package exports i module augmentation,
- rygorystyczny tsconfig oraz diagnozowanie różnic między środowiskami,
- wariancja callbacków, mutowalność i projektowanie publicznego API,
- testy typów oraz regresje, których nie widać w testach runtime,
- asynchroniczne typy, `Awaited`, anulowanie i modelowanie wyniku operacji,
- optymalizacja runtime bez przenoszenia niepotrzebnej złożoności do typów,
- kontrolowana migracja 5.9 → 6 → 7.

### Projekty i egzaminy

- `module-01`: repozytorium danych przyjmujące nieufne wejście, z niemutowalnym
  modelem domeny, walidacją i publicznym API,
- praktyczny egzamin z mapped, conditional, template literal i rekurencyjnych typów,
- migracja konfiguracji i pipeline'u z TS 5.9 przez TS 6 do natywnej bramki TS 7,
- `module-02`: odporny klient API z parserami `unknown`, branded ID, jawnym
  `Result`, retry/backoff, timeoutem, propagacją anulowania i kolejką zachowującą
  generyczny typ wyniku.

Końcowy moduł używa tych samych decyzji, które pojawiają się w istniejących
projektach: wstrzyknięty transport i mechanizm oczekiwania, jawna polityka retry,
sprzątanie listenerów i timerów, oddzielenie błędu HTTP od złego kontraktu danych
oraz statyczne testy publicznego API.

## Kryterium ukończenia tracka

Track jest gotowy dopiero wtedy, gdy:

- wszystkie rozwiązania przechodzą na TS 6 i TS 7,
- wszystkie startery mają deterministyczną czerwoną bramkę,
- każdy temat opisuje zastosowania, ograniczenia i typowe pułapki,
- zadania obejmują zarówno testy runtime, jak i kontrakty compile-time,
- moduły praktyczne wymagają decyzji projektowych podobnych do pracy w istniejącym
  projekcie, a nie wyłącznie uzupełnienia pojedynczej funkcji.

Wszystkie kryteria są spełnione. Otwartym elective pozostaje pomiar wydajności
samego kompilatora przez `--extendedDiagnostics`; wymaga osobnej bramki liczby
instancjacji i nie blokuje przejścia do Reacta.

## Źródła bazowe

- TypeScript 6.0 release notes:
  <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html>
- TypeScript 7.0 announcement:
  <https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/>
- typescript-eslint dependency policy:
  <https://typescript-eslint.io/users/dependency-versions/>
- TypeScript Handbook:
  <https://www.typescriptlang.org/docs/handbook/intro.html>
- TypeScript Handbook — narrowing:
  <https://www.typescriptlang.org/docs/handbook/2/narrowing.html>
- MDN — AbortSignal:
  <https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal>
- MDN — Using the Fetch API:
  <https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch>
