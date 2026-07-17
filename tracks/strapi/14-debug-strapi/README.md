# Debugowanie typowych awarii Strapi 5

## Kiedy

Gdy API działa pozornie poprawnie, ale miesza id/documentId, powiela efekty lifecycle albo ujawnia drafty i prywatne pola.

## Pułapki

Naprawa symptomu w frontendzie maskuje błąd kontraktu backendu. Regresję trzeba odtworzyć testem na tej samej granicy, na której wystąpiła.

## Źródła

- [Strapi 5](https://docs.strapi.io/cms/api/document-service)
- [Strapi 5](https://docs.strapi.io/cms/api/rest/status)
- [Strapi 5](https://docs.strapi.io/cms/backend-customization/controllers#sanitization-and-validation-in-controllers)

