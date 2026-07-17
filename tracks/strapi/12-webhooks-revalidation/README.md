# Webhooks i rewalidacja Next

## Kiedy

Gdy publikacja treści ma unieważnić dokładnie powiązany cache frontendu przez uwierzytelniony, idempotentny endpoint.

## Pułapki

Webhook może być ponowiony, przyjść poza kolejnością lub zostać sfałszowany. Globalne czyszczenie cache przy każdej zmianie niszczy korzyści cache.

## Źródła

- [Strapi 5](https://docs.strapi.io/cms/backend-customization/webhooks)
- [Strapi 5](https://docs.strapi.io/cms/configurations/webhooks)
- [Strapi 5](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

