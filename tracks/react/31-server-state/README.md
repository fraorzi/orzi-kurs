# Server state z TanStack Query 5

Stan serwerowy ma inną naturę niż lokalny stan interfejsu. Jest współdzielony,
asynchroniczny, może się zestarzeć i zmienić poza aplikacją. Cache zapytań opisuje
więc nie tylko wartość, ale też jej świeżość, status, błąd, aktywnych obserwatorów
i trwające odświeżenia.

## Klucz jest adresem danych

`queryKey` musi być tablicą i zawierać każdą zmienną, od której zależy `queryFn`.
`["projects", { status }]` tworzy osobne wpisy cache dla różnych filtrów. Klucze
powinny opisywać dane, nie komponent, który akurat je renderuje.

`staleTime` mówi, jak długo wynik jest świeży. Domyślnie dane są stale natychmiast,
co może powodować odświeżenie przy ponownym montażu, focusie okna lub odzyskaniu
sieci. To decyzja domenowa: kurs walut może mieć inne wymagania niż słownik krajów.

## Mutacje i spójność

Po mutacji trzeba wskazać, które zapytania utraciły aktualność. Invalidacja oznacza
je jako stale i odświeża aktywne obserwatory; nie wymaga ręcznego utrzymywania
znormalizowanego cache'u.

Optymistyczna zmiana cache'u poprawia odczuwaną szybkość, ale wymaga pełnego
protokołu: anulowania kolidujących refetchy, snapshotu, zmiany, rollbacku po błędzie
i finalnej invalidacji. Dla pojedynczego miejsca w UI prostsze może być pokazanie
`mutation.variables` bez modyfikowania cache'u.

## Cancellation

`queryFn` otrzymuje `AbortSignal`. Przekazanie go do `fetch` lub klienta API pozwala
przerwać request, gdy zapytanie staje się niepotrzebne. Samo utworzenie własnego
`AbortController` odcina request od lifecycle'u cache'u.

## Kiedy używać

- Cache zapytań dla danych pochodzących z API i współdzielonych przez widoki.
- Lokalny `useState` dla krótkotrwałego stanu UI, jak otwarte menu czy draft pola.
- Invalidację, gdy odpowiedź mutacji nie wystarcza do wiarygodnego odtworzenia danych.
- Optimistic update, gdy operacja jest częsta, przewidywalna i ma zaprojektowany rollback.

## Pułapki

- Pominięcie filtra w `queryKey` miesza różne zasoby w jednym cache'u.
- Tworzenie `QueryClient` podczas każdego renderu kasuje cache i trwające operacje.
- Kopiowanie danych query do `useState` tworzy dwa źródła prawdy.
- `fetch` nie odrzuca Promise dla HTTP 4xx/5xx bez jawnego sprawdzenia `response.ok`.
- Brak `return` przy invalidacji kończy stan pending mutacji zbyt wcześnie.
- Optymistyczny zapis bez rollbacku pozostawia fałszywy stan po błędzie.
- Globalne `retry` utrudnia deterministyczne testy błędów; klient testowy powinien je wyłączyć.

## Źródła

- <https://tanstack.com/query/latest/docs/framework/react/guides/query-keys>
- <https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults>
- <https://tanstack.com/query/latest/docs/framework/react/guides/query-functions>
- <https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation>
- <https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates>
- <https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation>
