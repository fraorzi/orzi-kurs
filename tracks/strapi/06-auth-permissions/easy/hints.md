## Hint 1

Jedno wyrażenie regularne kotwiczone `^Bearer ...$` załatwia i rozpoznanie
schematu, i odrzucenie dodatkowych segmentów naraz.

## Hint 2

`match?.[1] ?? null` — brak dopasowania (`null` z `exec`) ma dać ten sam
wynik co pusty/nieprawidłowy nagłówek, więc obie ścieżki kończą się w
jednym miejscu.

## Hint 3

Nie dziel nagłówka przez `split(" ")` i nie sprawdzaj `parts[0] ===
"Bearer"` osobno od reszty — to rozjeżdża się na przypadkach z wieloma
spacjami, które regex łapie za jednym razem.
