# Serwer HTTP bez frameworka

Framework daje router i middleware, ale kontrakty HTTP pozostają twoje.
Ten temat uczy trzech, które w code review usług wracają najczęściej:

**Routing to metoda + pathname.** Surowy URL zawiera query string; dopasowanie
tras porównuje `pathname` (przez `new URL`), a query parsuje się osobno.
Gdy ścieżka istnieje, ale metoda nie pasuje, poprawna odpowiedź to **405
z nagłówkiem `Allow`** wymieniającym dostępne metody — nie 404, który kłamie,
że zasobu nie ma.

**Body czyta się z limitem.** Body requestu to strumień kontrolowany przez
klienta — również złośliwego. Zbieranie chunków musi liczyć bajty i przerywać
**natychmiast** po przekroczeniu limitu (413), zamiast najpierw zbuforować
gigabajt, a potem odmówić. Osobną klasą błędu jest niepoprawny JSON (400) —
rozróżnienie 4xx "za dużo" od 4xx "niezrozumiałe" ma znaczenie dla klientów.

**Błędy mapują się na bezpieczny envelope.** Odpowiedź błędu niesie: status,
komunikat bezpieczny dla klienta i `requestId` do korelacji z logami. Nigdy:
stack trace, komunikaty wewnętrznych wyjątków, szczegóły infrastruktury.
Błędy walidacji (400) mogą nieść swój komunikat — opisują wejście klienta;
błędy nieznane (500) dostają komunikat generyczny.

## Kiedy używać

- Małe usługi wewnętrzne i narzędzia, gdzie framework to nadmiar.
- Review kodu HTTP: te trzy kontrakty to checklist niezależny od frameworka.
- Testy jednostkowe logiki HTTP bez podnoszenia socketa.

## Kiedy unikać

- Nie buduj własnego frameworka — komponuj małe funkcje o jawnych kontraktach.
- Nie parsuj query stringa ręcznie; `URL`/`URLSearchParams` są od tego.
- Nie zwracaj 500 dla błędów wejścia klienta ani 400 dla własnych awarii.

## Pułapki

- `new URL(rawUrl, base)` wymaga bazy dla ścieżek względnych — request niesie
  zwykle sam path.
- `Allow` przy 405 powinien być stabilny (posortowany, bez duplikatów) —
  ułatwia cache'owanie i testy.
- Limit bajtów liczy się z `chunk.byteLength`, nie długości stringów.
- Envelope 500 z `error.message` wycieka wnętrzności — komunikat generyczny,
  szczegóły tylko w logu z `requestId`.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [HTTP](https://nodejs.org/download/release/latest-v24.x/docs/api/http.html)
- [URL](https://nodejs.org/download/release/latest-v24.x/docs/api/url.html)
- [MDN: 405 Method Not Allowed](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405)
