# Końcowy audyt curriculum intern → mid

Data: 2026-07-17 (aktualizacja quality-pass: 2026-07-20).
Branch: `feature/curriculum-final-audit`.

## Wynik

Curriculum jest kompletne jako ścieżka od wiedzy internowej do praktycznej
samodzielności mida. Publiczny katalog ma 8 tracków, 222 tematy i 606 zadań
(Java: osobne repo `orzi-kurs_java`). Każde zadanie ma starter, rozwiązanie,
test i hinty; 19 pozycji to moduły projektowe lub capstone'y. Osiem dodatkowych
zadań `_smoke` testuje harness i nie wchodzi do materiału ucznia.

| Track | Tematy | Zadania | Moduły/capstone'y | rozwiązania/startery |
|---|---:|---:|---:|---:|
| JavaScript | 57 | 161 | 5 | 161/161 |
| TypeScript | 33 | 95 | 2 | 95/95 |
| React | 35 | 99 | 3 | 99/99 |
| Next.js | 22 | 62 | 2 | 62/62 |
| Node.js | 20 | 62 | 2 | 62/62 |
| MySQL | 22 | 68 | 2 | 68/68 |
| Strapi | 16 | 46 | 1 | 46/46 |
| Combined | 13 | 13 | 2 | 13/13 |
| **Razem** | **222** | **606** | **19** | **606/606** |

## Quality passy (2026-07-20)

Cztery ostatnie tracki (Node, MySQL, Strapi, Combined) powstały najpierw jako
szkice: poprawny zakres i rozwiązania, ale warstwa dydaktyczna poniżej
standardu tracków frontendowych (pojedynczy test na zadanie, szkieletowe
README, kopiowane hinty). Zostały przepisane w całości:

- **Node**: 20 tematów + 2 moduły — testy zachowania, README z modelem
  mentalnym, moduły przebudowane na wieloplikowe, kontrakt treści. Zob.
  `NODE_AUDIT.md`.
- **MySQL**: 22 tematy + 2 moduły na MySQL 8.4.10 — testy behawioralne (w tym
  scenariusze transakcyjne dwupołączeniowe i deadlock retry), moduły
  wieloplikowe, setup lokalnej bazy dla ucznia. Zob. `MYSQL_AUDIT.md`.
- **Strapi**: 15 tematów + moduł — semantyka Document Service, `[D]`/`[O]`,
  kontrakt treści. Zob. `STRAPI_AUDIT.md`.
- **Combined**: 13 projektów — 4–6 testów zachowania każdy, rozwiązania
  zreformatowane (naprawa lint), README Kontekst/Decyzje/Pułapki/Źródła.
  Zob. `COMBINED_AUDIT.md`.

Każdy pass utrzymał zielone bramki i wzmocnił `harness/*-content.test.ts`,
tak że kontrakt treści wymusza teraz testy zachowania, unikalne hinty
i objętość README.

## Kolejność i doświadczenie nauki

- Główna ścieżka frontendu to JavaScript → TypeScript → React → Next.js.
- React i Next nie zawierają starterów ani rozwiązań `.js`/`.jsx`; używają
  TypeScriptu i TSX.
- Node → MySQL → Strapi rozwija runtime, bazę i CMS po fundamentach języka.
- Combined nie powtarza składni: ćwiczy granice systemu, security, delivery,
  obserwowalność, awarie częściowe, rollout i maintenance.
- Java wyprowadzona do repo `orzi-kurs_java` (Gradle/JUnit/IntelliJ) — 2026-07-18;
  `tracks/java`, adapter kompilacji i skrypty usunięte z tego repo.
- `TOPIC_ORDER` dokładnie odpowiada katalogom.

## Wersje i źródła pierwotne

- JavaScript i Node: [cykl wydań Node](https://nodejs.org/en/about/previous-releases);
  Node 24 pozostaje linią LTS.
- TypeScript: [release notes 6.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)
  i natywna bramka TS 7.
- React: [React 19.2](https://react.dev/blog/2025/10/01/react-19-2) i stabilny
  [React Compiler](https://react.dev/learn/react-compiler).
- Next.js: lokalne `node_modules/next/dist/docs/` dla dokładnej wersji repo.
- MySQL: [Reference Manual 8.4](https://dev.mysql.com/doc/refman/8.4/en/).
- Strapi: [Document Service API](https://docs.strapi.io/cms/api/document-service).

Szczegółowe decyzje per technologia są w plikach `*_AUDIT.md`. Testy content
contract pilnują obecności źródeł w README.

## Merge

Kolejność merge: `ui-learning-navigation → curriculum-foundation → javascript
→ typescript → react → next → node → mysql → strapi → combined → final-audit`.
Ta gałąź jest zbiorczym rozszerzeniem łańcucha i może służyć jako pojedynczy
PR końcowy. Konflikty w `docs/curriculum/*_AUDIT.md`, `STATE.md`
i `tasks/curriculum.md` rozwiązuj biorąc wersję z tej gałęzi (zawiera
zaktualizowane audyty quality-pass).

## Weryfikacja

- `pnpm audit:curriculum`: komplet artefaktów i kolejności, 606/606.
- root `tsc --noEmit`, ESLint i `git diff --check` czyste.
- Pełne macierze rozwiązań/starterów: JS 161/161, TS 95/95 (TS 6 i TS 7),
  React 99/99, Next 62/62, Node 62/62, MySQL 68/68 (na realnym 8.4.10),
  Strapi 46/46, Combined 13/13.
- Harness content contract dla każdego tracka po quality-passie jest zielony.

Weryfikacja MySQL wymaga lokalnej instancji 8.4 (`ORZI_MYSQL_URL`); instrukcja
w `tracks/mysql/README.md`.
