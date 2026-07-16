## Hint 1

Użyj `it.each(["table", "cards"] as const)("... %s", async (layout) => ...)`.

## Hint 2

W każdym wariancie wywołaj `renderWithUser` i znajdź element przez
`screen.getByRole("button", { name: "Otwórz fakturę Acme" })`.

## Hint 3

Nie musisz wiedzieć, czy przycisk jest w `tr`, `article` ani na której pozycji.
Nazwa dostępna jest publicznym kontraktem obu layoutów.
