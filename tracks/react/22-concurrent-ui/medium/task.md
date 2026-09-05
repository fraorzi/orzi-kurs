# Stare wyniki zamiast migającego fallbacku

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `CatalogSearch` korzystający z `useDeferredValue` i `Suspense`.

Przekazany `resource.read(query)` zwraca wyniki albo zawiesza render, rzucając
Promise. Pole wyszukiwania ma zawsze pokazywać najnowsze zapytanie, natomiast
lista może chwilowo korzystać z poprzedniego zapytania.

Podczas oczekiwania:

- zachowaj stare wyniki zamiast pokazywać fallback `Ładowanie wyników…`,
- pokaż status `Aktualizowanie wyników…`,

Po przygotowaniu nowego wyniku usuń status i pokaż aktualną listę.
