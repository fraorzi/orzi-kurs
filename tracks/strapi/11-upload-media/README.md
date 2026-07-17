# Upload i Media Library

## Kiedy

Gdy API przyjmuje pliki, ogranicza rozmiar/MIME, nadaje bezpieczną nazwę i łączy media z dokumentem dopiero po sprawdzeniu uprawnień.

## Pułapki

Rozszerzenie pliku i deklarowany Content-Type nie są dowodem formatu. Upload przed authz marnuje zasoby, a publiczne role nie powinny dziedziczyć szerokich permissions.

## Źródła

- [Strapi 5](https://docs.strapi.io/cms/features/media-library)
- [Strapi 5](https://docs.strapi.io/cms/configurations/middlewares#body)
- [Strapi 5](https://docs.strapi.io/cms/features/users-permissions)

