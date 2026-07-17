# Walidacja, błędy API i transakcje

## Kiedy

Gdy jedna operacja domenowa zmienia kilka encji i potrzebuje atomowości, stabilnego kontraktu błędu oraz walidacji przed zapisem.

## Pułapki

TypeScript nie waliduje JSON w runtime. Surowe błędy bazy nie mogą wyciekać do klienta, a transakcja musi obejmować wszystkie zależne zapisy.

## Źródła

- [Strapi 5](https://docs.strapi.io/cms/backend-customization/controllers#sanitization-and-validation-in-controllers)
- [Strapi 5](https://docs.strapi.io/cms/error-handling)
- [Strapi 5](https://docs.strapi.io/cms/configurations/database#transactions)

