# Streamuj sekcje dashboardu niezależnie

Zaimplementuj `Dashboard`. Nagłówek ma być od razu poza granicami. Przychód i
zamówienia odczytaj przez `use()` w osobnych komponentach i osobnych granicach
`Suspense`, z fallbackami `Ładowanie przychodu…` i `Ładowanie zamówień…`.

Rozwiązanie ma pozwolić pokazać szybszą sekcję bez oczekiwania na drugą Promise.
