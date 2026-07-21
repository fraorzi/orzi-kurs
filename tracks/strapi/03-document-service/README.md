# Document Service API

Document Service jest domyślną warstwą dostępu do treści w Strapi 5,
zastępując Entity Service z v4. Kluczowa różnica: każdy wpis ma stabilny
`documentId` (24-znakowy identyfikator), niezależny od numerycznego `id`
rekordu w bazie. Jeden dokument może mieć **wiele rekordów** jednocześnie —
osobny wiersz na `status` (`draft`/`published`) i osobny na `locale` — i
wszystkie dzielą ten sam `documentId`. Numeryczne `id` identyfikuje
konkretny wiersz, nie dokument; po publikacji draftu powstaje **nowy**
rekord `published`, z innym `id`, tym samym `documentId`.

`findOne`/`findMany` domyślnie czytają **draft** i domyślne locale, jeśli
nie podasz `status`/`locale` jawnie — bezpieczny publiczny odczyt musi
zawsze ustawić `status: "published"` i konkretne `locale` explicite,
inaczej ujawni niepublikowaną treść. Dane zwrócone przez Document Service
nie są sanitizowane — trafiają do własnego kontrolera surowe, łącznie z
polami `private`, dopóki nie przejdą przez warstwę `sanitize` (temat 7).

`update` i `publish` to osobne operacje: `update` zapisuje zmiany w
wersji draft, `publish` tworzy z niej wersję published dla wskazanego
locale. Wołanie samego `publish` bez wcześniejszego `update` publikuje
**starą** treść draftu — kolejność ma znaczenie.

## Kiedy używać

- Własna usługa domenowa czyta/pisze treść i musi rozróżniać `documentId`
  (tożsamość dokumentu) od `id` (tożsamość rekordu-wersji).
- Publiczny endpoint odczytu — zawsze z jawnym `status: "published"` i
  jawnym `locale`, nigdy na domyślnych wartościach.
- Sekwencja edycji redakcyjnej: `update` draftu, potem `publish`, gdy obie
  operacje mają się powieść razem albo wcale.

## Kiedy unikać

- Nie identyfikuj dokumentu przez `Number(documentId)` ani żadną inną
  konwersję na `id` — to dwa niezależne systemy identyfikatorów.
- Nie polegaj na domyślnym `status`/`locale` w kodzie serwerowym, który
  obsługuje żądania publiczne — domyślne wartości Document Service są
  pomyślane pod panel administracyjny, nie pod Content API.
- Nie zwracaj wyniku Document Service bezpośrednio z własnego kontrolera
  bez sanitization — może zawierać pola oznaczone jako `private`.

## Pułapki

- `documentId` bez walidacji formatu (24 znaki, alfanumeryczne) łatwo
  pomylić z numerycznym `id` w URL-u albo w logu błędu.
- Publikacja jednego locale nie publikuje innych — każdy wpis
  wielojęzyczny ma niezależny cykl draft/publish (temat 4).
- `update` rzucający wyjątek **musi** przerwać sekwencję przed `publish` —
  inaczej publikujesz niekompletną albo niezwalidowaną zmianę.
- Wpis draft i wpis published tego samego `documentId`+`locale` mają różne
  `id` — porównywanie po `id` zamiast po `documentId`+`locale`+`status`
  gubi właściwą wersję.

## Źródła (audyt 2026-07-20, Strapi 5)

- [Document Service API](https://docs.strapi.io/cms/api/document-service)
- [Document Service — status](https://docs.strapi.io/cms/api/document-service/status)
- [Document Service — locale](https://docs.strapi.io/cms/api/document-service/locale)
