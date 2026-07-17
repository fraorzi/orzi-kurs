# REST API v5 i jawne zapytania

## Kiedy

Gdy klient pobiera płaskie odpowiedzi Strapi 5 i musi ograniczyć fields/populate, filtrować, sortować oraz paginować bez nadmiernego transferu.

## Pułapki

Strapi nie populates relations automatycznie. `populate=*` nie jest bezpiecznym domyślnym kontraktem, a page i offset pagination nie mogą być mieszane.

## Źródła

- [Strapi 5](https://docs.strapi.io/cms/api/rest)
- [Strapi 5](https://docs.strapi.io/cms/api/rest/populate-select)
- [Strapi 5](https://docs.strapi.io/cms/api/rest/sort-pagination)

