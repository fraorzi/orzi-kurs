## Hint 1

To koniunkcja dwóch warunków, nie alternatywa — `draft` wymaga `preview`
**i** roli editor naraz.

## Hint 2

`role === "editor"` jest fałszywe, gdy `role` jest `undefined` — nie
potrzebujesz osobnej gałęzi na brakujący argument.

## Hint 3

Cała funkcja to jeden warunek trójargumentowy zwracający `"draft"` albo
`"published"` — jeśli masz więcej niż jedno rozgałęzienie, upraszczasz za
mało.
