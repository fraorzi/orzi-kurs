# Checkout z focusem na pierwszym błędzie

Zaimplementuj `CheckoutForm`.

Formularz ma kontrolowane pola `Imię i nazwisko`, `E-mail` i `Kod pocztowy`.
Walidacja przy submitcie:

- imię i nazwisko po `trim()` jest wymagane,
- e-mail musi zawierać `@`,
- kod ma format `NN-NNN`.

Pokaż podsumowanie `Popraw dane formularza.` z `role="alert"`, połącz każdy
komunikat z jego polem przez `aria-describedby`, ustaw `aria-invalid` i przenieś
focus do pierwszego niepoprawnego pola w kolejności formularza.

Poprawny submit wywołuje `onSubmit` z przyciętym imieniem, e-mailem zapisanym małymi
literami i niezmienionym poprawnym kodem.
