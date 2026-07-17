# Hints

## Hint 1

Najpierw sprawdź idempotency key, dopiero potem wykonuj kosztowne efekty.

## Hint 2

Walidacja i auth muszą zakończyć się przed rezerwacją inventory.

## Hint 3

W catch zwolnij dokładnie zarezerwowaną ilość; rewaliduj dopiero po saveResult.

