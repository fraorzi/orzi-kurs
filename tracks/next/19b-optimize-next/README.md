# Optymalizacja Next po pomiarze

Zadania `[O]` zaczynają się od kodu poprawnego funkcjonalnie. Test zachowania musi
pozostać zielony, a osobna bramka `[quality]` mierzy konkretny koszt. Refaktor bez
pomiaru łatwo zamienia się w przesuwanie złożoności.

Najczęstsze koszty App Routera to za szeroki client module graph, waterfall
niezależnych odczytów oraz cache key zawierający dane techniczne requestu. Dyrektywę
`"use client"` przesuwaj do interaktywnego liścia. Niezależne Promise uruchamiaj
razem. Argumenty cache'owanej funkcji ogranicz do wartości, które faktycznie
zmieniają wynik, zachowując izolację tenantów i wariantów.

## Kiedy używać

- Analizy bundla wskazującej konkretny ciężki moduł w client graph.
- Trace'a pokazującego sekwencyjne, niezależne odczyty.
- Metryk cache hit rate i cardinality wskazujących zbyt szeroki klucz.
- Budżetów liczby wywołań zamiast niestabilnych milisekund w CI.

## Kiedy unikać

- Przenoszenia interakcji na serwer tylko dla mniejszego bundla.
- `Promise.all` dla operacji zależnych lub mutacji wymagających kolejności.
- Usuwania tenant/user ID z klucza, jeśli wynik jest spersonalizowany.
- Cache'owania danych świeżych per request tylko po to, by uciszyć warning.

## Pułapki

- Client barrel, który ponownie rozszerza graf po pozornym refaktorze.
- Równoległość bez limitu dla tysięcy operacji.
- `requestId`, timestamp lub cały obiekt propsów jako część cache key.
- Poprawa hit rate kosztem wycieku danych między tenantami.

## Źródła

- <https://nextjs.org/docs/app/guides/production-checklist#routing-and-rendering>
- <https://nextjs.org/docs/app/getting-started/server-and-client-components#reducing-js-bundle-size>
- <https://nextjs.org/docs/app/getting-started/fetching-data#parallel-data-fetching>
- <https://nextjs.org/docs/app/api-reference/directives/use-cache#cache-keys>
