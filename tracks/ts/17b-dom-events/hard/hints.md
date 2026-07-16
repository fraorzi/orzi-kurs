## Hint 1

Najpierw oba cele muszą być `instanceof Element`.

## Hint 2

Użyj `event.target.closest<HTMLElement>("[data-action]")` i sprawdź `contains`.

## Hint 3

Napisz predykat `isAction`, potem sprawdź `dataset.id` i disabled button.
