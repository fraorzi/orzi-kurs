# Migracja widgetu na Server Components

## Kontekst

Widget oznaczony `"use client"` pobiera dane po mount i wysyła do
przeglądarki znacznie więcej niż potrzebuje — cały rekord bazy danych,
łącznie z polami, które użytkownik nigdy nie powinien zobaczyć, choć jedyną
realną interakcją jest mały filtr tekstowy. Projekt łączy dwie warstwy tego
samego przepływu danych: przygotowanie DTO po stronie serwera (co wolno
zobaczyć klientowi) i renderowanie po stronie klienta (jak ten DTO
zamienia się w interaktywny UI). To standardowy podział pracy w App Routerze
Next.js — serwer robi kosztowną, uprzywilejowaną robotę raz, klient dostaje
tylko to, czego faktycznie potrzebuje do interakcji.

## Decyzje

- **Filtrowanie i minimalizacja DTO należą do serwera.** `loadWidgetItems`
  odrzuca draft-y i redukuje rekord do trzech pól — klient nigdy nie widzi
  `secret` ani `status`, nawet w devtoolsach czy w RSC payloadzie.
- **`Date` przechodzi granicę jako `string`.** Propsy z serwera do klienta
  muszą być serializowalne; `toISOString()` to jawna, jednoznaczna
  konwersja zamiast polegania na domyślnej (nie)serializacji obiektów.
- **Client Component dostaje gotowe dane, nie surowy fetcher.** `Widget`
  przyjmuje `items` przez propsy i nie wie nic o `fetchRows` ani o
  kształcie `RecordRow` — granica między warstwami jest szczelna w obie
  strony.
- **Filtr jest jedynym stanem po stronie klienta.** Nie ma żadnego innego
  `useEffect` ani fetchu w komponencie — to zamierzone: minimalizuje ilość
  JavaScriptu wysyłanego do przeglądarki, zgodnie z celem migracji.

## Pułapki

- Zwrócenie `fetchRows()` bez transformacji "działa" w JS (structural
  typing na starterze to ukrywa), ale przecieka `secret` do klienta —
  test sprawdza `JSON.stringify`, nie tylko kształt obiektu.
- Podpięty `onChange` bez użycia stanu w renderowanej liście to częsty
  błąd: input wygląda na działający (wartość się zmienia), a lista mimo to
  pokazuje wszystko — sprawdzaj efekt w DOM, nie tylko stan komponentu.
- Pusty wynik filtra bez `role="status"` jest niewidoczny dla czytnika
  ekranu — użytkownik słyszy ciszę i nie wie, czy strona się zawiesiła.
- `Date` przekazany bezpośrednio przez granicę serwer→klient wygląda na
  działający lokalnie (jeden proces, jeden runtime), ale w prawdziwym RSC
  payloadzie serializacja obiektów niebędących zwykłymi danymi jest
  niejawna i zaskakująca — konwertuj jawnie.

## Źródła (audyt 2026-07-20)

- [Next.js: Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [React: Server Components](https://react.dev/reference/rsc/server-components)
- [React: Passing props to a Component — serializowalność](https://react.dev/learn/passing-props-to-a-component)
