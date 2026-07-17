# Testy API przez HTTP

## Kiedy

Gdy chcesz potwierdzić routing, middleware, permissions, sanitization i statusy na rzeczywistej granicy HTTP, nie tylko jednostkowo wywołując serwis.

## Pułapki

Wspólna baza i losowe fixture tworzą flaky tests. Test z tokenem admina nie dowodzi, że public/editor permissions są poprawne.

## Źródła

- [Strapi 5](https://docs.strapi.io/cms/testing)
- [Strapi 5](https://docs.strapi.io/cms/backend-customization/routes)
- [Strapi 5](https://nodejs.org/download/release/latest-v24.x/docs/api/test.html)

