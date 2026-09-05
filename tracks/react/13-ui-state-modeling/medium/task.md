# Zaproszenie użytkownika bez sprzecznych flag

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `InviteForm`.

Formularz ma pole `E-mail` i przycisk `Wyślij zaproszenie`. Stan jest unią:

- `editing` z e-mailem,
- `submitting` z e-mailem,
- `error` z e-mailem i komunikatem,
- `success` z zaproszonym e-mailem.

Submit pustej wartości nic nie robi. Podczas pending pole i przycisk są wyłączone.
Po błędzie pokaż alert `Nie udało się wysłać zaproszenia.` i pozwól ponowić operację
bez utraty adresu. Sukces pokazuje `Zaproszono {email}` i usuwa poprzedni błąd.
