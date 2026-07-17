# Zwróć stan walidacji zamiast rzucać błąd

Zaimplementuj `createContact`. Odczytaj i przytnij `email` oraz `message` z
`FormData`. Email musi mieć prosty kształt `tekst@tekst.domena`, a wiadomość od 10
do 500 znaków.

Dla błędów nie wywołuj `save`; zwróć status `error`, wartości pól i tablice
komunikatów per pole. Dla poprawnych danych wywołaj `save`, zwróć `success` i ID.
