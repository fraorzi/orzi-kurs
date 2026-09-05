# Checkout z przejściem do pierwszego błędnego pola

Tryb: uzupełnienie. W `starter.tsx` jest gotowy szablon. Zaimplementuj brakującą logikę opisaną poniżej.

Pola, ich stan i wyświetlanie błędów są gotowe. Uzupełnij wysłanie `CheckoutForm`.
Sprawdź dane w tej kolejności:

1. `fullName` po `trim()` nie może być puste. Błąd: `Podaj imię i nazwisko.`
2. `email` musi zawierać `@`. Błąd: `Podaj poprawny adres e-mail.`
3. `postalCode` ma format `NN-NNN`. Błąd: `Kod pocztowy musi mieć format 00-000.`

Zapisz błędy w `errors`. Jeśli są błędy, pokaże się podsumowanie
`Popraw dane formularza.`. Przenieś focus do pierwszego błędnego pola i nie wywołuj `onSubmit`.
Przy poprawnych danych usuń stare błędy i wywołaj `onSubmit` z przyciętym imieniem,
przyciętym e-mailem zapisanym małymi literami i niezmienionym poprawnym kodem.
