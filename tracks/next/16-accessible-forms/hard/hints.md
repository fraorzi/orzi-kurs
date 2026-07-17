## Hint 1

Osobny komponent potomny może użyć `useFormStatus()` i odczytać `data?.get("intent")`.
## Hint 2

Trzymaj ref do przycisku publikacji i przekaż go do `event.currentTarget.form?.requestSubmit(ref.current)`.
