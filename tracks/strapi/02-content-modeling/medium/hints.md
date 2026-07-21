## Hint 1

`id` znika przez samo pominięcie go w wyniku mapowania — destrukturyzuj
tylko `question` i `answer` z elementu wejściowego.

## Hint 2

Przytnij przed sprawdzeniem długości: `" ".length` to 1, ale po `trim()`
to 0 — filtr pustości musi działać na wartości już przyciętej.

## Hint 3

`map` zamienia kształt, `filter` odrzuca elementy — rób je w tej
kolejności (najpierw przytnij, potem odfiltruj), żeby filtr widział już
przycięte wartości.
