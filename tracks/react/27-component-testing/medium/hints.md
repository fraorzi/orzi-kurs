## Hint 1

Zachowaj funkcję `resolve` z konstruktora Promise, kliknij `Szukaj`, sprawdź status,
a następnie rozwiąż Promise wewnątrz `act`.

## Hint 2

Element oczekiwany po async aktualizacji znajdź przez
`await screen.findByRole("list", { name: "Wyniki" })`.

## Hint 3

Dla błędu wystarczy osobny mock `vi.fn().mockRejectedValue(...)` oraz
`await screen.findByRole("alert")`.
