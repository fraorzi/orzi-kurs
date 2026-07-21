# Uwierzytelnianie, tokeny i permissions

Strapi 5 chroni Content API na dwóch niezależnych osiach: **uwierzytelnianie**
(kim jest wywołujący — JWT użytkownika z `users-permissions`, API token,
albo nikt/public) i **autoryzacja** (co ta tożsamość może zrobić — RBAC per
akcja per content type). Poprawny, niewygasły token odpowiada tylko na
pierwsze pytanie; sam w sobie nie daje żadnego prawa do zasobu — to osobna
decyzja, sprawdzana osobno.

`users-permissions` przechowuje uprawnienia jako allow-listę: rola ma
jawną listę akcji w formacie `<content-type-uid>.<action>`
(`api::article.article.update`). Brak wpisu **oznacza odmowę** — nie ma
domyślnego "tak", nawet dla roli `authenticated`. Rola `public` jest
domyślnie maksymalnie ograniczona: jeśli endpoint ma być dostępny bez
logowania, trzeba jej to jawnie przyznać.

RBAC per akcja to dopiero połowa modelu w realnych aplikacjach — druga
połowa to **własność zasobu** (ownership): editor zwykle może edytować
tylko swoje dokumenty, nie cudze, mimo że ma uprawnienie `update` do
całego content type. Ta reguła nie jest częścią standardowego RBAC
Strapi — trzeba ją dopisać w polityce albo kontrolerze.

## Kiedy używać

- Middleware/policy sprawdzający `Authorization: Bearer <token>` przed
  dotarciem żądania do kontrolera.
- Autoryzacja akcji przez allow-listę `rola -> [akcje]`, gdzie brak wpisu
  jest równoznaczny z odmową.
- Łączenie RBAC z ownership: rola daje ogólne prawo do akcji, dodatkowy
  warunek zawęża je do zasobów należących do wywołującego.

## Kiedy unikać

- Nie loguj pełnego nagłówka `Authorization` ani surowego tokena — nawet w
  logach błędów. Loguj co najwyżej fakt "brak/nieprawidłowy token".
- Nie zakładaj, że sam poprawny format tokena (np. dopasowanie do wzorca
  JWT) oznacza ważność — to osobna weryfikacja (podpis, wygaśnięcie), nie
  część tego tematu, ale nie myl jednego z drugim w kodzie.
- Nie twórz reguł autoryzacji, które da się ominąć danymi z żądania
  (np. rolą przekazaną w body zamiast odczytaną z zweryfikowanego tokena).

## Pułapki

- Nagłówek `Authorization` bez dokładnego schematu `Bearer <token>` (zły
  scheme, brak spacji, pusta wartość po `Bearer `) trzeba jawnie odrzucić
  — niejednoznaczny parsing bywa furtką.
- Public role jest domyślnie ograniczona do zera akcji — endpoint
  "publiczny" w Strapi to świadomie nadane uprawnienie, nie stan wyjściowy.
- RBAC per content type nie wie nic o właścicielu rekordu — bez dodatkowego
  sprawdzenia `ownerId === userId` editor edytuje cudze dokumenty tak samo
  łatwo jak swoje.
- Rola `admin` w logice domenowej zwykle powinna omijać sprawdzenie
  ownership — jeśli tego nie zakodujesz explicite, administrator utknie na
  tej samej regule co editor.

## Źródła (audyt 2026-07-20, Strapi 5)

- [Users & Permissions plugin](https://docs.strapi.io/cms/features/users-permissions)
- [API tokens](https://docs.strapi.io/cms/features/api-tokens)
- [RBAC](https://docs.strapi.io/cms/features/rbac)
