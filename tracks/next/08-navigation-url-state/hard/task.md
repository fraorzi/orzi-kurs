# Parsuj stan listy i buduj linki paginacji

Tryb: naprawa. W `starter.ts` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `readCatalogState`. `searchParams` jest Promise, wartości mogą być
tablicami. Przyjmij pierwszy string, trimuj query, dopuść trzy wartości sortowania,
a page parsuj jako dodatnią liczbę całkowitą i ogranicz do `1..totalPages`.

Zbuduj `previousHref` i `nextHref`, zachowując query i niedomyślny sort. Nie umieszczaj
`page=1`; na krańcach zwróć `null`.
