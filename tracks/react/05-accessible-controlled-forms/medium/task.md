# Profil z opisanymi błędami

Zaimplementuj `ProfileForm`.

Formularz ma kontrolowane pola `Nazwa wyświetlana` i `Bio` oraz przycisk `Zapisz`.
Przy submitcie:

- nazwa po `trim()` nie może być pusta,
- bio może mieć maksymalnie 120 znaków,
- błędne pole dostaje `aria-invalid`,
- komunikat jest jego dostępnym opisem przez `aria-describedby`,
- `onSave` jest wywołane wyłącznie dla poprawnych danych, z przyciętymi wartościami.

Treści błędów: `Podaj nazwę wyświetlaną.` oraz `Bio może mieć maksymalnie 120 znaków.`
