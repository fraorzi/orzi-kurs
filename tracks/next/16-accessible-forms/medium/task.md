# Połącz błędy Action z dostępnym formularzem

Zaimplementuj `ContactForm` z `useActionState`. Pole email po błędzie ma mieć
`aria-invalid="true"` i `aria-describedby="email-error"`; wiadomość analogicznie.
Komunikaty renderuj pod stabilnymi ID i z `role="alert"`.

Przycisk ma być wyłączony w pending i zmieniać tekst na `Wysyłanie…`. Po sukcesie
pokaż live status `Wysłano zgłoszenie {id}`. Użyj natywnych `required` i typu email.
