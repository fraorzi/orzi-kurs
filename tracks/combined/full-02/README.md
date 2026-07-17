# Capstone maintenance: naprawa webhooka

## Kontekst

Zastany handler gubi retry po awarii, wykonuje N+1 i loguje sekret. Zadanie zaczyna się od bug reportu i kończy planem bezpiecznego rollout.

## Decyzje

Event jest oznaczany jako seen dopiero po sukcesie, dokumenty są batchowane, log ma allow-listę, a diagnoza i rollout są częścią artefaktu.

## Źródła

- [Dokumentacja](https://sre.google/sre-book/postmortem-culture/)
- [Dokumentacja](https://owasp.org/www-project-application-security-verification-standard/)
- [Dokumentacja](https://docs.strapi.io/cms/backend-customization/webhooks)

