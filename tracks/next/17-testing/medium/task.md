# Zbuduj harness kontraktu Route Handlera

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `requestJson`, który testuje handler przez standardowy `Request`.
Przyjmij metodę, URL, opcjonalne nagłówki i body. Jeśli body istnieje, serializuj je
do JSON i ustaw `Content-Type`, nie nadpisując jawnej wartości.

Zwróć status, kopię nagłówków i sparsowane body tylko dla odpowiedzi JSON. Dla 204
lub innego content type zwróć `body: null`. Nie importuj prywatnych API Next.
