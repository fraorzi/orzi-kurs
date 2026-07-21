## Hint 1

Sprawdź `published === null` jako pierwszy, samodzielny warunek — reszta
logiki (porównanie treści) ma sens tylko wtedy, gdy published istnieje.

## Hint 2

Porównanie `draft === published` działa na wartościach `string`, nie na
referencjach obiektów — oba parametry to już wyekstrahowana treść, nie
całe encje.

## Hint 3

Tylko trzy możliwe wyniki, dwa warunki: `published === null` rozstrzyga
`new`, `draft === published` rozstrzyga `published`, reszta to `modified`
— nie potrzebujesz trzeciego jawnego `if`.
