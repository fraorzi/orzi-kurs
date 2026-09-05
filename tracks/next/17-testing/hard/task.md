# Opisz krytyczny checkout jako stabilny test E2E

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `runCheckoutJourney` na przekazanym adapterze przeglądarki. Otwórz
`/products`, wejdź linkiem `Kawa`, dodaj produkt, przejdź linkiem `Koszyk`, sprawdź
nagłówek `Koszyk` i tekst `1 produkt`, przejdź `Do kasy`, wpisz email, złóż
zamówienie i poczekaj na URL pasujący do `/orders/o-*`. Na końcu sprawdź nagłówek
`Zamówienie przyjęte`.

Używaj wyłącznie lokatorów po rolach/nazwach i widocznym tekście. Nie dodawaj sleep,
selektorów CSS ani asercji o prywatnym RSC payload - journey ma działać także dla
async Server Components.
