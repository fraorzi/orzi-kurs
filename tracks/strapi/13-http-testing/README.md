# Testy API przez granicę HTTP

Wywołanie kontrolera bezpośrednio jako funkcji dowodzi, że logika
biznesowa działa — nie dowodzi, że **endpoint** działa. Routing, kolejność
middleware/policy, serializacja odpowiedzi (`Content-Type`, kształt JSON),
kody statusu i nagłówki to część kontraktu, którą ominięcie warstwy HTTP
zostawia nieprzetestowaną. Strapi udostępnia `strapi.server.httpServer`
oraz `strapi.load()`/`strapi.destroy()` do testów integracyjnych na
prawdziwym serwerze; w tym repo odpowiednikiem jest
`withStrapiHttp(handler, run)` z `@harness/strapi-test` — stawia
efemeryczny serwer HTTP (port `0`, przydzielany przez system) wokół
handlera `(Request) => Promise<Response>` i daje `request(path, init)`
zwracające prawdziwy `Response`, z nagłówkami i statusem, bez mocków.

Kontrakt błędów Strapi jest stały: `{ error: { status, name, message } }`
z nazwami klas takimi jak `NotFoundError`, `UnauthorizedError`,
`ForbiddenError`, `ValidationError`. Test HTTP, który sprawdza tylko
`response.status`, pomija połowę kontraktu — klient (frontend, integracja
zewnętrzna) rozróżnia przypadki po `error.name`, nie tylko po liczbie.
Test z tokenem administratora, który zawsze przechodzi, niczego nie mówi
o `public`/`authenticated` — trzeba wysłać osobne żądanie dla każdej roli
i porównać statusy, nie zakładać, że jeden udany request wystarczy.

Testy integracyjne dzielą zasoby (serwer, magazyn w pamięci, port) między
przypadkami — bez jawnej izolacji (setup/cleanup wokół każdego przebiegu)
dane z jednego testu przeciekają do następnego i wynik zależy od
kolejności uruchomienia, co jest źródłem klasycznych flaky tests.

## Kiedy używać

- Weryfikacja pełnego łańcucha: routing → middleware/policy → kontroler →
  serializacja odpowiedzi, gdy sama logika domenowa już ma testy
  jednostkowe.
- Sprawdzanie kontraktu błędów (status + `error.name` + nagłówki) na
  granicy, którą faktycznie widzi klient HTTP.
- Macierz uprawnień: to samo żądanie z różnymi tożsamościami
  (anonymous/editor/admin), porównane po statusach w jednym teście.

## Kiedy unikać

- Nie zastępuj testów jednostkowych logiki domenowej testami HTTP — HTTP
  dowodzi integracji, nie zastępuje szybkiej pętli testowej dla samej
  logiki.
- Nie współdziel stanu (mapy, licznika, portu) między przypadkami testowymi
  bez jawnego resetu — kolejność uruchomienia testów nie jest gwarantowana.
- Nie testuj tylko `status === 200` na happy path „bo najszybciej” — brak
  asercji na `Content-Type` i kształt błędu przepuszcza regresje w
  serializacji.

## Pułapki

- Test przechodzący tylko dla roli `admin` nie dowodzi niczego o
  `public`/`editor` — każda rola z macierzy uprawnień potrzebuje
  osobnego żądania i osobnej asercji statusu.
- Pominięty `await` na `response.json()`/`response.text()` w teście HTTP
  daje asercję na niewypełnioną obietnicę zamiast na treść odpowiedzi —
  test przechodzi, mimo że nic nie sprawdził.
- `cleanup`, który nie wykona się po nieudanym `run` (brak `try/finally`),
  zostawia stan współdzielony między testami — kolejny test widzi dane z
  poprzedniego i wynik zależy od kolejności uruchomienia.
- Błąd zgłoszony przez `cleanup` nie powinien przykryć pierwotnego błędu
  `run` — obydwa trzeba zaraportować, ale ten z `run` jest przyczyną.

## Źródła (audyt 2026-07-20, Strapi 5)

- [Testing](https://docs.strapi.io/cms/testing)
- [Error handling](https://docs.strapi.io/cms/error-handling)
- [REST API](https://docs.strapi.io/cms/api/rest)
- [Node.js: `node:test`](https://nodejs.org/download/release/latest-v24.x/docs/api/test.html)
