# [D] Debugowanie typowych awarii Strapi 5

API, które kompiluje się i odpowiada statusem `200`, wciąż może być
zepsute — trzy klasy błędów w tym temacie są tak podstępne właśnie
dlatego, że nie rzucają wyjątków, tylko cicho zwracają złe dane.

**Zły populate.** REST API Strapi 5 **nie populates relacji domyślnie** —
pole relacyjne bez jawnego `populate` w zapytaniu nie pojawia się w
odpowiedzi wcale (brak klucza, nie `null`). Kod, który zakłada, że
`entry.cover.url` zawsze istnieje, przechodzi code review i testy na
danych z `populate=*`, a wywala się dopiero na produkcji, gdy ktoś
zawęzi zapytanie do potrzebnych pól. Poprawny kod odróżnia „relacja
niespopulowana” od „relacja pusta” i nie zakłada żadnej z nich milcząco.

**Brak locale.** Strapi i18n filtruje treść po parametrze `locale` w
zapytaniu — gdy go zabraknie, endpoint **nie zwraca błędu**, tylko
milcząco podstawia skonfigurowany `defaultLocale`. Klient, który
zapomniał dołączyć `locale` do żądania, dostaje odpowiedź `200` z
poprawnie ukształtowanymi, ale **złymi językowo** danymi — użytkownik
strony w wersji angielskiej widzi treść polską, bez żadnego sygnału
błędu po drodze.

**Wyciek draftu w REST.** Endpoint listy, który filtruje po roli
niepoprawnie (albo wcale), zwraca `200` z listą zawierającą drafty i
pola, które nie powinny opuścić serwera (np. dane robocze, sekrety
edytorskie) — dla użytkownika **publicznego**. To nie błąd 500, który
ktoś zauważy w logach; to poprawnie sformatowana odpowiedź z
nieuprawnionymi danymi w środku.

Wspólny mianownik: żaden z tych błędów nie rzuca wyjątku ani nie zwraca
kodu błędu. Regresję trzeba więc odtworzyć testem na **tej samej
granicy**, na której wystąpiła (REST, nie wywołanie serwisu wprost) —
inaczej test przejdzie, mimo że produkcyjny endpoint wciąż jest zepsuty.

## Kiedy używać

- Diagnozowanie „działa, ale źle” — endpoint zwraca `200`, kształt
  odpowiedzi się zgadza, ale treść jest niekompletna, w złym języku albo
  zawiera dane, których nie powinno tam być.
- Pisanie testu regresyjnego dla zgłoszonego buga, zanim naprawisz kod —
  test ma odtworzyć dokładnie ten symptom na tej samej granicy (REST),
  na której go zgłoszono.
- Code review kodu dotykającego relacji, i18n albo widoczności
  draft/published — to trzy miejsca, gdzie milczące złe zachowanie jest
  normą, nie wyjątkiem.

## Kiedy unikać

- Nie naprawiaj symptomu w warstwie, która go tylko ujawniła (frontend
  renderujący `undefined` jako pusty string) — błąd jest w kontrakcie
  backendu, naprawa gdzie indziej tylko go maskuje.
- Nie zakładaj, że brak błędu w konsoli oznacza brak buga — wszystkie
  trzy scenariusze tego tematu kończą się poprawną odpowiedzią `200`.
- Nie testuj naprawy wyłącznie jednostkowo na serwisie, gdy bug objawił
  się na REST — granica HTTP ma własne miejsca do popełnienia tego
  samego błędu na nowo (np. w kontrolerze, nie w serwisie).

## Pułapki

- `entry.cover?.url` naprawia crash, ale nie odróżnia „relacja
  niespopulowana” od „relacja pusta” — czasem to rozróżnienie jest
  częścią kontraktu (np. UI ma inny placeholder dla „brak zdjęcia” niż
  dla „zapomniano populate”).
- Domyślny `locale` przy braku parametru to udokumentowane zachowanie
  Strapi, nie błąd frameworka — odpowiedzialność za dołączenie `locale`
  do zapytania leży całkowicie po stronie klienta.
- Endpoint listy (`GET /api/articles`) przy braku wyników zwraca `200` z
  pustą tablicą, nie `404` — filtrowanie draftów dla public roli musi
  dawać `data: []`, a nie błąd, gdy wszystko jest draftem.
- Sanityzacja pól (allow-list) i filtrowanie statusu (draft/published)
  to dwie niezależne operacje — naprawienie jednej nie naprawia drugiej.

## Źródła (audyt 2026-07-20, Strapi 5)

- [REST API — populate & select](https://docs.strapi.io/cms/api/rest/populate-select)
- [Internationalization (i18n)](https://docs.strapi.io/cms/features/internationalization)
- [Draft & Publish](https://docs.strapi.io/cms/features/draft-and-publish)
- [Controllers: sanitization and validation](https://docs.strapi.io/cms/backend-customization/controllers#sanitization-and-validation-in-controllers)
