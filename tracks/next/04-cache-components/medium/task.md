# Zachowaj statyczny shell dashboardu

Dashboard czeka teraz na personalizowane powitanie przed zwróceniem całej strony.
Przenieś oczekiwanie do `ViewerGreeting` i wyrenderuj ten komponent pod wąskim
`Suspense` z fallbackiem `Ładowanie użytkownika…`.

Nagłówek i nawigacja mają pozostać poza granicą, aby mogły wejść do statycznego
shellu. `Page` nie powinien być funkcją `async` ani ręcznie wywoływać komponentu.
