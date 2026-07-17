## Hint 1

Wartość z `FormData.get` ma typ `FormDataEntryValue | null`, czyli może być `File`.

## Hint 2

Budżet sprawdź dopiero po `typeof rawBudget === "string"`; użyj `Number` i
`Number.isFinite`.

## Hint 3

Zbuduj `fieldErrors`, a na końcu sprawdź, czy ma jakiekolwiek klucze.
