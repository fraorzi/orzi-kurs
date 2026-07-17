# Optymalizacja Strapi po pomiarze

## Kiedy

Gdy poprawny endpoint przesyła za dużo pól, wykonuje N+1 wywołań albo unieważnia cache szerzej niż wymaga zmiana dokumentu.

## Pułapki

Optymalizacja nie może zmienić wyniku ani permissions. `populate=*`, sekwencyjne odczyty relacji i globalny purge są prostymi, lecz kosztownymi skrótami.

## Źródła

- [Strapi 5: populate i fields](https://docs.strapi.io/cms/api/rest/populate-select)
- [Strapi 5: Document Service populate](https://docs.strapi.io/cms/api/document-service/populate)
- [Next: revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

