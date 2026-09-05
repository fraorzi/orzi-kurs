# Streamuj sekcje dashboardu niezależnie

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `Dashboard`. Nagłówek ma być od razu poza granicami. Przychód i
zamówienia odczytaj przez `use()` w osobnych komponentach i osobnych granicach
`Suspense`, z fallbackami `Ładowanie przychodu…` i `Ładowanie zamówień…`.

Rozwiązanie ma pozwolić pokazać szybszą sekcję bez oczekiwania na drugą Promise.
