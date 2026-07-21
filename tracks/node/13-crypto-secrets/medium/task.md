# Medium — porównaj podpisy stałoczasowo

Webhook przysyła podpis HMAC w hex; porównujesz go z własnym wyliczeniem.
Zaimplementuj `solve(leftHex, rightHex)`:

- niepoprawny hex (nieparzysta długość, znaki spoza `[0-9a-f]`) → `false`,
  bez wyjątku;
- różna długość → `false` **przed** wywołaniem `timingSafeEqual` — na
  buforach różnej długości ono rzuca;
- równej długości poprawne wejścia porównaj przez `crypto.timingSafeEqual`;
- wielkość liter w hex nie może mieć znaczenia.

Zwykłe `===` kończy na pierwszej różnicy i zdradza czasem odpowiedzi, ile
znaków się zgadza — stąd cały ten kontrakt.
