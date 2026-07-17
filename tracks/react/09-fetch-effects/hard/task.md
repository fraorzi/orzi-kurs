# Anulowanie pobierania szczegółów produktu

Zaimplementuj `ProductDetails`.

`client.load(productId, signal)` rozpoczyna pobieranie produktu. Dla każdego cyklu
efektu utwórz nowy `AbortController`, przekaż jego signal do klienta i wywołaj
`abort()` w cleanupie.

Komponent pokazuje `Ładowanie produktu…`, nazwę po sukcesie albo alert
`Nie udało się pobrać produktu.` po nieanulowanym błędzie. Wynik requestu, którego
signal został anulowany, nie może zmienić UI nawet wtedy, gdy adapter mimo to rozwiąże
obietnicę.
