## Hint 1

UID przestrzeni `api` ma dokładnie kształt `api::<collection>.<contentType>`
— jedna para dwukropków, jedna kropka, oba segmenty kebab-case. Wszystko
inne to błąd, nie przypadek do obsłużenia po cichu.

## Hint 2

Jedno wyrażenie regularne z dwiema grupami przechwytującymi rozwiązuje
zarówno parsowanie, jak i walidację — brak dopasowania to sygnał do rzucenia
błędu.

## Hint 3

Komunikat błędu ma wspominać `UID`, żeby wywołujący (np. rejestr serwisów)
mógł go odróżnić od innych wyjątków walidacyjnych w logach.
