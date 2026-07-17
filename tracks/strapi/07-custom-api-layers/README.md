# Custom routes, controllers i services

## Kiedy

Gdy standardowy CRUD nie wystarcza i potrzebujesz własnego endpointu, ale chcesz zachować testowalny serwis domenowy oraz sanitization odpowiedzi.

## Pułapki

Logika domenowa w kontrolerze utrudnia transakcje i testy. Document Service zwraca niesanitizowane dane, więc własny kontroler musi użyć Content API sanitization.

## Źródła

- [Strapi 5](https://docs.strapi.io/cms/backend-customization/routes)
- [Strapi 5](https://docs.strapi.io/cms/backend-customization/controllers)
- [Strapi 5](https://docs.strapi.io/cms/backend-customization/services)

