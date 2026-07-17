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
- pełny pipeline rozwiązań: 13/13,
- pierwotne startery: 13/13 poprawnie nie przechodzi całej bramki.

## Źródła przekrojowe

- [React](https://react.dev/learn)
- [Next.js](https://nextjs.org/docs/app)
- [Strapi 5](https://docs.strapi.io/cms)
- [MySQL 8.4](https://dev.mysql.com/doc/refman/8.4/en/)
- [GitHub Actions](https://docs.github.com/en/actions/get-started/quickstart)
- [Docker build best practices](https://docs.docker.com/build/building/best-practices/)
- [OpenTelemetry JS](https://opentelemetry.io/docs/languages/js/)
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
