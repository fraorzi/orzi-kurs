## Hint 1

`reverse`: rozłóż napis na punkty kodowe przez `[...str]`, odwróć tablicę i sklej.
`split("")` rozbiłby emoji na dwie jednostki i odwrócenie by je uszkodziło.

## Hint 2

`equalIgnoringForm`: sprowadź oba napisy do tej samej formy przed porównaniem —
`a.normalize("NFC") === b.normalize("NFC")`.
