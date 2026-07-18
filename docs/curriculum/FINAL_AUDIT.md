# Końcowy audyt curriculum intern → mid

Data: 2026-07-17. Branch: `feature/curriculum-final-audit`.

## Wynik

Curriculum jest kompletne jako ścieżka od wiedzy internowej do praktycznej
samodzielności mida. Publiczny katalog ma 8 tracków, 222 tematy i 606 zadań (Java: osobne repo orzi-kurs_java).
Każde zadanie ma starter, rozwiązanie, test i hinty; 27 pozycji to moduły projektowe
lub capstone'y. Osiem dodatkowych zadań `_smoke` testuje harness i nie wchodzi do
materiału ucznia.

| Track | Tematy | Zadania | Moduły/capstone'y | Starter = solution = test = hints |
|---|---:|---:|---:|---:|
| JavaScript | 57 | 161 | 5 | 161/161 |
| TypeScript | 33 | 95 | 2 | 95/95 |
| React | 35 | 99 | 3 | 99/99 |
| Next.js | 22 | 62 | 2 | 62/62 |
| Node.js | 22 | 62 | 2 | 62/62 |
| MySQL | 24 | 68 | 2 | 68/68 |
| Strapi | 16 | 46 | 1 | 46/46 |
| Combined | 13 | 13 | 2 | 13/13 |
| **Razem** | **222** | **606** | **19** | **606/606** |

## Kolejność i doświadczenie nauki

- Główna ścieżka frontendu to JavaScript → TypeScript → React → Next.js.
- React i Next nie zawierają starterów ani rozwiązań `.js`/`.jsx`; używają
  TypeScriptu i TSX.
- Node → MySQL → Strapi rozwija runtime, bazę i CMS po fundamentach języka.
- Combined nie powtarza składni: ćwiczy granice systemu, security, delivery,
  obserwowalność, awarie częściowe, rollout i maintenance.
- Java wyprowadzona do repo `orzi-kurs_java` (Gradle/JUnit/IntelliJ) — 2026-07-18.
- UI ma jawne metadane wszystkich aktywnych tracków i semantyczne etapy nauki.
- `TOPIC_ORDER` dokładnie odpowiada katalogom. Audyt naprawił stary slug MySQL
  `21-debugging-sql` na rzeczywisty `21-debug-data-incidents`.

## Wersje i źródła pierwotne

- JavaScript i Node: [oficjalny cykl wydań Node](https://nodejs.org/en/about/previous-releases)
  oraz [Node API](https://nodejs.org/api/); Node 24 pozostaje linią LTS.
- TypeScript: [release notes 6.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)
  i natywna bramka TS 7.
- React: [React 19.2](https://react.dev/blog/2025/10/01/react-19-2) i stabilny
  [React Compiler](https://react.dev/learn/react-compiler).
- Next.js: lokalne `node_modules/next/dist/docs/` dla dokładnej wersji repo oraz
  [Next.js 16](https://nextjs.org/blog/next-16).
- MySQL: [Reference Manual 8.4](https://dev.mysql.com/doc/refman/8.4/en/) i
  [model LTS](https://dev.mysql.com/doc/refman/8.4/en/mysql-releases.html).
- Strapi: [Document Service API](https://docs.strapi.io/cms/api/document-service),
  [REST API](https://docs.strapi.io/cms/api/rest) i dokumentacja backend customization.
- Java: [OpenJDK 25](https://openjdk.org/projects/jdk/25/),
  [Java SE 25 API](https://docs.oracle.com/en/java/javase/25/docs/api/) oraz program PJATK.

Szczegółowe decyzje per technologia są w plikach `*_AUDIT.md`. Każdy README tracka
ma źródła właściwe dla wersji docelowej, a testy content contract pilnują ich obecności.

## Branche i commity

| Zakres | Branch | Commit |
|---|---|---|
| Fundament | `feature/curriculum-foundation` | `38f9880` |
| JavaScript | `feature/curriculum-javascript` | `bc81b47` |
| TypeScript | `feature/curriculum-typescript` | `b769e5c` |
| React | `feature/curriculum-react` | `dfa1196` |
| Next.js | `feature/curriculum-next` | `01b5064` |
| Node.js | `feature/curriculum-node` | `cadddd0` |
| MySQL | `feature/curriculum-mysql` | `5f767f4` |
| Strapi | `feature/curriculum-strapi` | `6183ce6` |
| Combined | `feature/curriculum-combined` | `80c3fc5` |
| Java | `feature/curriculum-java` | `1204b0a` |
| Końcowy audyt | `feature/curriculum-final-audit` | bieżący HEAD |

Wszystkie branche technologiczne są zgodne lokalnie z odpowiadającymi im referencjami
`origin/*`. Końcowa gałąź jest sekwencyjnym rozszerzeniem Javy, więc zawiera całe
curriculum i może służyć jako pojedynczy PR zbiorczy.

## Weryfikacja

- `pnpm audit:curriculum`: komplet artefaktów i kolejności 645/645.
- root `tsc --noEmit`, ESLint i `git diff --check`.
- Java: 39/39 kompilacji rozwiązanie+test, 39/39 runtime i 39/39 bramek starterów.
- Harness: 79/80; jedyny niewykonany test otwiera lokalny port HTTP i kończy się
  systemowym `listen EPERM` przed asercjami.
- Wcześniejsze pełne macierze: JS 161/161, TS 95/95 na TS 6 i TS 7, React 99/99,
  Next 62/62, Node 62/62 i MySQL 68/68 na realnym 8.4.10.
- Strapi po dodaniu granicy HTTP: 45/46 rozwiązań w sandboxie; jedyny brak to moduł
  wymagający zakazanego portu. Wszystkie pozostałe zadania przechodzą, a startery
  mają 46/46 poprawnych bramek.
- Combined: 13/13 rozwiązań, 13/13 bramek starterów i osobny strict TypeScript.

CLI curriculum używa bezpośredniego loadera `node --import tsx`, dzięki czemu nie
wymaga pomocniczego socketu IPC. Pozostaje tylko test sieciowy Strapi, bo sandbox
blokuje samo `listen(127.0.0.1)`. Java targetuje JDK 25, lecz fizyczny runtime JDK 25
nie był dostępny — wspólny stabilny core 24/25 przeszedł na OpenJDK 24.0.1.
