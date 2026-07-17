# Pobieranie danych na serwerze: walidacja i współbieżność

Server Components mogą wykonywać operacje asynchroniczne i czytać dane bez
wysyłania kodu loadera do przeglądarki. Samo przeniesienie `fetch` na serwer nie
gwarantuje jednak poprawności: odpowiedź HTTP nadal może mieć status błędu, a
wynik `response.json()` ma w praktyce nieznany kształt.

Traktuj granicę sieciową jak wejście typu `unknown`. Najpierw sprawdź `ok`, potem
zweryfikuj pola potrzebne UI i dopiero zbuduj własny typ domenowy. Dzięki temu
błąd pojawia się przy źródle danych, a nie kilka komponentów dalej.

## Współbieżność i zależności

Niezależne operacje należy rozpocząć przed pierwszym `await`. Sekwencja dwóch
zapytań trwających po 300 ms może kosztować około 600 ms, podczas gdy ich
równoległe wykonanie zbliża czas do wolniejszego z nich. `Promise.all` jest
czytelnym wyborem, gdy wszystkie wyniki są potrzebne do dalszej pracy.

Nie każde zapytanie jest jednak niezależne. Jeżeli zamówienia wymagają `user.id`,
mogą ruszyć dopiero po użytkowniku. Nadal warto od razu rozpocząć pobieranie
feature flags, które tego identyfikatora nie potrzebują. Projektuj graf
zależności zamiast mechanicznie wybierać między „wszystko po kolei” i „wszystko
równolegle”.

## Kiedy używać

- Server Component lub moduł serwerowy, gdy dane nie wymagają interakcji klienta.
- Jawnej walidacji na każdej zewnętrznej granicy HTTP.
- `Promise.all` dla niezależnych wyników potrzebnych w tym samym miejscu.
- Wcześnie uruchomionych promise'ów dla częściowo zależnego grafu danych.
- `loading.tsx` lub `<Suspense>` wtedy, gdy wolny fragment może być streamowany
  niezależnie; ten przypadek rozwija osobny temat.

## Pułapki

- `fetch` nie odrzuca promise'a wyłącznie z powodu statusu 404 lub 500.
- `response.json() as Product[]` wycisza TypeScript, ale nie sprawdza runtime'u.
- Kilka kolejnych `await` tworzy waterfall, nawet jeśli zapytania są niezależne.
- Bezwarunkowe `Promise.all` jest błędne, gdy późniejsze wywołanie potrzebuje
  wyniku wcześniejszego.
- `useEffect` do początkowych danych dubluje pracę klienta, opóźnia treść i wymaga
  dodatkowego stanu ładowania.
- Vitest nie obsługuje obecnie pełnego unit testu asynchronicznych Server
  Components; dlatego ćwiczenia testują wydzielone loadery, a zachowanie całej
  strony należy pokrywać testem E2E.

## Źródła

- <https://nextjs.org/docs/app/getting-started/fetching-data>
- <https://nextjs.org/docs/app/getting-started/server-and-client-components>
- <https://nextjs.org/docs/app/guides/testing/vitest>
- <https://developer.mozilla.org/en-US/docs/Web/API/Response/ok>
- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all>
