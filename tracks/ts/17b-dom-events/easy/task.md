# Easy — bezpieczny odczyt pola z eventu

Zaimplementuj `readTextValue(event)`.

- użyj `event.currentTarget`,
- dla `HTMLInputElement` i `HTMLTextAreaElement` zwróć `.value`,
- dla innego elementu albo `null` zwróć `null`,
- nie używaj assertion.

Test listenera jest uruchamiany w jsdom na prawdziwych elementach.
