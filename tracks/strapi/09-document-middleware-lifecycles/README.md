# Document middleware i lifecycle hooks

## Kiedy

Gdy logika dotyczy operacji na całym dokumencie i musi objąć create/update/publish niezależnie od liczby rekordów bazy.

## Pułapki

Publish, locale i komponenty mogą uruchomić wiele operacji bazowych. Lifecycle hook wysyłający efekt uboczny per rekord tworzy duplikaty; middleware dokumentu widzi intencję API.

## Źródła

- [Strapi 5](https://docs.strapi.io/cms/api/document-service/middlewares)
- [Strapi 5](https://docs.strapi.io/cms/backend-customization/models#lifecycle-hooks)
- [Strapi 5](https://docs.strapi.io/cms/migration/v4-to-v5/breaking-changes/lifecycle-hooks-document-service)

