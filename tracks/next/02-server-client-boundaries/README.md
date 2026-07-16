# Server i Client Components: świadoma granica bundle'u

Layouty i strony App Routera są domyślnie Server Components. Mogą czytać dane
blisko źródła, używać sekretów i wysyłać do przeglądarki wynik renderowania bez
JavaScriptu komponentu. Client Components są potrzebne dopiero dla stanu,
handlerów, lifecycle'u, custom hooków i API przeglądarki.

`"use client"` nie opisuje pojedynczej funkcji. Wyznacza punkt wejścia do client
module graph: wszystkie importy tego modułu i komponenty renderowane bezpośrednio
stają się częścią bundle'u klienta. Dyrektywy nie trzeba powtarzać w każdym pliku
poniżej tej granicy.

## Dane przekraczające granicę

Propsy Server → Client muszą być serializowalne przez React. Zwykłe obiekty, tablice,
stringi i liczby są dobrym kontraktem. Dowolny callback, instancja klasy, połączenie
z bazą czy obiekt zależny od runtime serwera nie powinny przekraczać tej granicy.
Server Functions mają osobny, jawny kontrakt omawiany przy Actions.

Server-rendered UI można przekazać do Client Component przez `children` lub inny
slot. Nie oznacza to wciągnięcia implementacji tego Server Component do client
module graph, jeśli klient go bezpośrednio nie importuje.

## Ochrona środowiska

Moduł z kluczem API, bazą lub uprzywilejowanym dostępem powinien importować
`"server-only"`. Next wtedy zgłosi błąd build-time przy próbie użycia go w Client
Component. Dane przed przekazaniem do UI należy ograniczyć do DTO, zamiast wysyłać
cały rekord i liczyć na to, że komponent nie pokaże wrażliwych pól.

Zmienne bez prefiksu `NEXT_PUBLIC_` nie trafiają do klienta, ale zastąpienie sekretu
pustym stringiem nie naprawia błędnej architektury. `server-only` daje wcześniejszy
i czytelniejszy błąd.

## Kiedy używać

- Server Component dla danych, sekretów, dużych zależności i statycznego UI.
- Client Component jako możliwie małej interaktywnej wyspy.
- Serializowalnego DTO jako jawnego kontraktu granicy.
- `server-only` w modułach DAL i integracji z uprzywilejowanymi usługami.
- `children` do wizualnego osadzenia server-rendered UI w interaktywnym shellu.

## Pułapki

- `"use client"` w root layout przenosi niepotrzebnie szerokie drzewo do bundle'u.
- Funkcja przekazana jako zwykły prop nie jest serializowalnym kontraktem RSC.
- Import serwerowego loadera do Client Component zatruwa środowisko i może ujawnić kod.
- Context Reacta nie działa bez Client Component providera.
- Samo ukrycie pola w JSX nie ogranicza danych wysłanych w payloadzie.
- Unit test zwykłego renderu nie wykryje wszystkich naruszeń granicy RSC; potrzebne
  są także kontrakty źródła, build lub E2E.

## Źródła

- <https://nextjs.org/docs/app/getting-started/server-and-client-components>
- <https://nextjs.org/docs/app/api-reference/directives/use-client>
- <https://nextjs.org/docs/app/guides/data-security>
- <https://react.dev/reference/rsc/use-client>
