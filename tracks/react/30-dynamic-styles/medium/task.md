# Przekaż motyw przez typowany token CSS

Tryb: uzupełnienie. W `starter.tsx` jest punkt wyjścia. Dopisz brakujące zachowanie opisane poniżej.

Uzupełnij `StatusBadge`. Kolor `accent` jest wybierany w runtime i powinien trafić
na korzeń komponentu jako custom property `--badge-accent`.

Zdefiniuj wąski typ rozszerzający `CSSProperties`, aby TypeScript znał obsługiwany
token. Nie ustawiaj osobno `color`, `backgroundColor` ani `borderColor` w JSX -
stała klasa `.status-badge` wykorzysta token w arkuszu CSS.
