# Korelacja, logi i metryki

## Kontekst

Incydent przechodzi przez Next, Strapi i MySQL; operator musi połączyć request ID, czas, status i kod błędu bez logowania danych osobowych.

## Decyzje

Log jest strukturalny, metryki mają niską kardynalność, a correlation ID przechodzi przez wszystkie warstwy.

## Źródła

- [Dokumentacja](https://opentelemetry.io/docs/languages/js/getting-started/nodejs/)
- [Dokumentacja](https://nodejs.org/download/release/latest-v24.x/docs/api/async_context.html)

