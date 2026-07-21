# Moduł: backend contentowy Strapi 5

Łączy warstwę HTTP, authz, walidację runtime, Document Service, draft/publish, opcjonalny upload, sanitization, webhook rewalidacyjny oraz bezpieczny cleanup.

## Kryteria ukończenia

- nieautoryzowane żądanie nie wykonuje efektów,
- zapis używa `documentId`, locale i jawnego publish,
- własna odpowiedź jest sanitizowana,
- media są usuwane po częściowym błędzie,
- webhook jest emitowany dopiero po sukcesie.

## Źródła

- [Document Service API](https://docs.strapi.io/cms/api/document-service)
- [Controllers: sanitization](https://docs.strapi.io/cms/backend-customization/controllers#sanitization-and-validation-in-controllers)
- [Upload](https://docs.strapi.io/cms/features/media-library)
- [Webhooks](https://docs.strapi.io/cms/backend-customization/webhooks)

