# Przycisk śledzący nadrzędny formularz

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Napraw `ContactForm`, aby podczas wykonywania `sendMessage` przycisk był wyłączony
i zmieniał tekst z `Wyślij` na `Wysyłanie…`.

Użyj `useFormStatus`. Hook ma zostać wywołany w osobnym komponencie potomnym
formularza, a nie w komponencie, który renderuje sam `<form>`.
