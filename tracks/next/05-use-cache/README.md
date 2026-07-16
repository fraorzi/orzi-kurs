# `use cache`: klucz, lifetime i tagi

Dyrektywa `"use cache"` może objąć asynchroniczną funkcję, komponent, stronę albo
cały moduł. Next tworzy klucz z build ID, identyfikatora funkcji, serializowalnych
argumentów oraz wartości przechwyconych z zewnętrznego scope'u. Ten kontrakt jest
częścią architektury danych, nie tylko optymalizacją.

Argumenty i wynik muszą być serializowalne zgodnie z RSC. Klasa, funkcja, symbol,
`WeakMap` czy instancja `URL` nie powinny być elementem klucza. Dane request-time,
takie jak `cookies()` i `headers()`, odczytaj poza cached scope i przekaż do niego
jako prostą wartość — na przykład `sessionId`.

## Lifetime

`cacheLife` wywołuje się w tym samym scope, w którym zdefiniowano cache. Profile
`seconds`, `minutes`, `hours`, `days`, `weeks` i `max` opisują trzy czasy:

- `stale` — jak długo router klienta ufa wpisowi bez sprawdzania serwera,
- `revalidate` — kiedy kolejny request uruchamia odświeżenie w tle,
- `expire` — kiedy brak świeżego wpisu wymusza blokujące odtworzenie.

Profil powinien wynikać z tolerancji biznesowej na stare dane. `seconds` jest tak
krótki, że wpis nie trafia do prerenderu i staje się dynamiczną dziurą. Jawny profil
ułatwia review zagnieżdżonych cache'y i zapobiega przypadkowemu dziedziczeniu czasu.

## Tagi

`cacheTag` łączy wpis z domenowymi zdarzeniami unieważniającymi. Dobre tagi mają
różną granularność, na przykład wspólne `products`, lista tenantu
`tenant:acme:products` oraz szczegół `tenant:acme:product:keyboard`. Dzięki temu
mutacja może odświeżyć dokładnie te widoki, których dotyczy.

## Kiedy używać

- Danych współdzielonych między requestami, dla których znasz tolerancję świeżości.
- Kosztownych, deterministycznych obliczeń i odczytów, które mogą wejść do shellu.
- Prostych parametrów domenowych jako części klucza.
- Tagów odzwierciedlających listę, encję i granicę tenantu.

## Pułapki

- Wywołanie `cookies()` albo `headers()` bezpośrednio w `use cache`.
- Funkcja loadera lub instancja klasy jako argument cached function.
- Niejawny profil `default`, gdy wymagania produktu mówią coś innego.
- Jeden globalny tag dla całej aplikacji i masowe unieważnianie niezależnych danych.
- Tag bez tenant ID w aplikacji wielodostępnej.
- Oczekiwanie trwałego runtime cache w każdej instancji serverless; domyślny cache
  runtime jest pamięciowym LRU procesu.

## Źródła

- <https://nextjs.org/docs/app/api-reference/directives/use-cache>
- <https://nextjs.org/docs/app/api-reference/functions/cacheLife>
- <https://nextjs.org/docs/app/api-reference/functions/cacheTag>
- <https://nextjs.org/docs/app/getting-started/caching>
