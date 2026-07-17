# Module 01 — panel zgłoszeń projektu

Pierwszy moduł przekrojowy łączy routing, URL state, DAL, DTO, Server Action i
rewalidację w feature podobny do codziennej pracy mida. Lista jest sterowana przez
query string, dzięki czemu filtr można udostępnić i odtworzyć po nawigacji.

Autoryzacja nie ufa `projectId` z formularza. DAL ustala relację użytkownika z
projektem, a Action odczytuje zgłoszenie po ID, sprawdza jego prawdziwy projekt i
dopiero wtedy mutuje. Na zewnątrz wychodzi DTO bez notatek wewnętrznych.

## Kiedy używać

- URL jako źródła prawdy dla filtrów, sortowania i paginacji.
- Server-only DAL jako wspólnej granicy odczytów i authz.
- Wyników Action dla oczekiwanych błędów walidacji/uprawnień.
- Tagu obejmującego listę projektu po udanej mutacji.

## Pułapki

- Ukryte pole `projectId` potraktowane jako dowód uprawnienia.
- Listowanie po statusie bez warunku tenant/project.
- DTO utworzone przez spread rekordu zawierającego sekretne pola.
- Filtr zerujący inne parametry URL albo pozostawiający nieistniejącą stronę.
- Rewalidacja przed potwierdzoną mutacją.

## Źródła

- <https://nextjs.org/docs/app/guides/authentication#data-access-layer>
- <https://nextjs.org/docs/app/guides/forms>
- <https://nextjs.org/docs/app/guides/caching#revalidating>
- <https://nextjs.org/docs/app/api-reference/functions/use-search-params>
