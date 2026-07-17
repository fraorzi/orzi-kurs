# CRUD Next + Strapi z auth

## Kontekst

Server Action modyfikuje dokument Strapi i musi ponownie sprawdzić sesję, ownership, input oraz precyzyjnie odświeżyć cache.

## Decyzje

Authz jest blisko danych, zapis używa documentId, a rewalidacja następuje wyłącznie po sukcesie.

## Źródła

- [Dokumentacja](https://nextjs.org/docs/app/getting-started/updating-data)
- [Dokumentacja](https://docs.strapi.io/cms/api/document-service)

