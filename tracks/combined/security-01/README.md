# Przekrojowy security gate

## Kontekst

Endpoint przyjmuje token, payload i IP; musi rozdzielić authn/authz, walidację, rate limit i bezpieczne logowanie.

## Decyzje

Odmowa jest domyślna, sekrety są redagowane, log zawiera request ID, a limiter działa przed kosztownym handlerem.

## Źródła

- [Dokumentacja](https://owasp.org/www-project-application-security-verification-standard/)
- [Dokumentacja](https://nodejs.org/download/release/latest-v24.x/docs/api/crypto.html)

