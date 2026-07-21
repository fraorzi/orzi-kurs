# Audyt projektów combined

Data: 2026-07-17.

## Założenie

Track nie powtarza lekcji technologicznych. Każdy projekt wymusza kontrakt między
co najmniej dwiema warstwami albo kompetencję, która zwykle ujawnia się dopiero
w utrzymaniu systemu produkcyjnego.

## Zakres

- TypeScript + React: generyczne komponenty, reducer i Context.
- JavaScript + Node: pool współbieżności i ograniczone retry w CLI.
- React + Next: minimalizacja granicy Client/Server i serializowalne DTO.
- Next + Strapi: authz, Document Service, upload i kontrakt Image.
- Node + MySQL: transakcja, rollback i retry całej operacji po deadlocku.
- Quality: test regresji, identity, a11y i usunięcie kwadratowego lookupu.
- Security: authn/authz, rate limit i allow-list bezpiecznego logu.
- Delivery: kolejność CI, build, backup, expand migration, healthcheck i rollback.
- Observability: correlation ID, strukturalny log i metryki niskiej kardynalności.
- Capstone delivery: idempotencja, inventory, CMS, cache, kompensacja i log.
- Capstone maintenance: bug report, utracone retry, N+1, wyciek sekretu, test,
  metryka rollout i warunek rollback.

## Standard artefaktu

Każdy z 13 projektów ma kontekst, decyzje, minimum dwa źródła pierwotne, zadanie,
progresywne hinty, starter, rozwiązanie oraz test. React/Next pozostają wyłącznie
w TypeScript/TSX. Dwa capstone’y są wieloplikowe i zawierają jawne typy domenowe.

## Weryfikacja

- 13/13 artefaktów i 13/13 lokalnych plików testowych,
- strict TypeScript przez `tracks/combined/tsconfig.json`: bez diagnostyki,
- root lint i `git diff --check`: bez błędów,
- dynamiczny Vitest/verify solutions/starters pozostaje obowiązkową bramką audytu
  końcowego; bieżący limit rozszerzonych narzędzi uniemożliwił jego start.

## Źródła przekrojowe

- [React](https://react.dev/learn)
- [Next.js](https://nextjs.org/docs/app)
- [Strapi 5](https://docs.strapi.io/cms)
- [MySQL 8.4](https://dev.mysql.com/doc/refman/8.4/en/)
- [GitHub Actions](https://docs.github.com/en/actions/get-started/quickstart)
- [Docker build best practices](https://docs.docker.com/build/building/best-practices/)
- [OpenTelemetry JS](https://opentelemetry.io/docs/languages/js/)
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)

## Quality pass (2026-07-20)

Pierwotna wersja tracka miała 13 projektów z poprawnym zamysłem, ale
warstwą dydaktyczną poniżej standardu i rozwiązaniami zapisanymi w jednej
linii (część oblewała lint sonarjs). Quality pass przepisał całość:

- **Reformatowanie rozwiązań** do czytelnej wieloliniowej postaci — naprawia
  `sonarjs/no-unenclosed-multiline-block` i `no-nested-conditional`, które
  wywracały baseline (5 z 13 rozwiązań oblewało lint na wejściu).
- **Testy**: 4–6 nazwanych testów zachowania per projekt (poprzednio 1),
  osie czasu efektów, kompensacje, granice authz/walidacji, przypadki brzegowe
  wielu warstw. Projekty React (.tsx) testowane pod jsdom przez
  `@testing-library/react`.
- **task.md** jako ticket: kontekst produktowy, wymagania funkcjonalne
  i niefunkcjonalne, kryteria akceptacji.
- **README** każdego projektu: Kontekst / Decyzje / Pułapki / Źródła
  (40–70 linii) tłumaczące, jakie warstwy projekt spina i dlaczego.
- **Capstone'y** `full-01` (pionowa publikacja: idempotencja, authz,
  rezerwacja zapasu, kompensacja) i `full-02` (naprawa incydentu webhooka
  z notatką postmortem) rozbudowane o pełny kontrakt i test regresji.
  W `full-02` naprawiono niespójność: test regresji wymagał słowa „retry",
  którego brakowało w notatce decyzyjnej rozwiązania.
- **Kontrakt treści** (`harness/combined-content.test.ts`): wymusza sekcje
  README + objętość, ≥4 testy per projekt, ≥3 hinty, unikalność hints.

Macierz końcowa: 13/13 rozwiązań i 13/13 starterów, kontrakt treści 3/3,
harness 74/74, root `tsc --noEmit` i lint czyste.
