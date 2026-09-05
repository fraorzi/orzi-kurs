# Walidacja profilu

Tryb: uzupełnienie. W `starter.tsx` jest gotowy szablon. Zaimplementuj brakującą logikę opisaną poniżej.

HTML formularza, pola, stan `data`, stan `errors` i wyświetlanie komunikatów są gotowe.
Uzupełnij obsługę wysłania formularza `ProfileForm`:

- nazwa po `trim()` nie może być pusta;
- bio przed przycięciem może mieć maksymalnie 120 znaków;
- zapisz błędy w `errors`: `Podaj nazwę wyświetlaną.` i `Bio może mieć maksymalnie 120 znaków.`;
- jeśli są błędy, nie wywołuj `onSave`;
- jeśli dane są poprawne, usuń stare błędy i wywołaj `onSave` z przyciętą nazwą i bio.

Przykład: nazwa `"  Ada  "` i bio `"  Frontend  "` mają trafić do `onSave`
jako `{ displayName: "Ada", bio: "Frontend" }`.
