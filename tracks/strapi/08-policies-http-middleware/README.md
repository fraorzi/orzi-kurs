# Policies i middleware HTTP

## Kiedy

Gdy wiele tras współdzieli decyzję authz, korelację, walidację kontekstu albo bezpieczne nagłówki przed i po kontrolerze.

## Pułapki

Policy powinna zwracać decyzję lub kontrolowany błąd, nie wykonywać zapisu. Middleware musi zawsze wywołać `next` dokładnie raz i nie ufać nagłówkom klienta bez walidacji.

## Źródła

- [Strapi 5](https://docs.strapi.io/cms/backend-customization/policies)
- [Strapi 5](https://docs.strapi.io/cms/backend-customization/middlewares)
- [Strapi 5](https://docs.strapi.io/cms/configurations/middlewares)

