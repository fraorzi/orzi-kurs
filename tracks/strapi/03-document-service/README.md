# Document Service API

## Kiedy

Gdy własna usługa backendowa czyta i modyfikuje dokumenty Strapi 5 z użyciem stabilnego `documentId`, statusu oraz locale.

## Pułapki

Document Service domyślnie czyta draft/default locale i zwraca niesanitizowane dane. Numeryczne `id` identyfikuje wpis bazy, nie cały dokument.

## Źródła

- [Strapi 5](https://docs.strapi.io/cms/api/document-service)
- [Strapi 5](https://docs.strapi.io/cms/api/document-service/status)
- [Strapi 5](https://docs.strapi.io/cms/api/document-service/locale)

