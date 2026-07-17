# Capstone pionowy: publikacja oferty

## Kontekst

Jeden use case przechodzi przez auth, walidację, inventory w bazie, draft/publish CMS, idempotencję, cache i obserwowalność.

## Decyzje

Idempotency key zamyka duplikaty, kompensacja zwalnia inventory po awarii CMS, a rewalidacja następuje po utrwaleniu wyniku.

## Źródła

- [Dokumentacja](https://nextjs.org/docs/app/getting-started/updating-data)
- [Dokumentacja](https://docs.strapi.io/cms/api/document-service)
- [Dokumentacja](https://dev.mysql.com/doc/refman/8.4/en/commit.html)

