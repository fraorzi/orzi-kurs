## Hint 1

Adnotacja wyniku nie usuwa pól. Jawnie zbuduj `{ id: profile.id, name: profile.name }`.

## Hint 2

Patch można nałożyć przez `{ ...profile, ...patch }`; kolejność spreadów ma znaczenie.

## Hint 3

Nie próbuj ręcznie sprawdzać opcjonalnych pól. Ich kształt jest już ograniczony przez
`ProfilePatch`, a zadanie nie dotyczy danych `unknown`.
