# Medium - bezpieczny scope przez using

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zaimplementuj `runScoped(acquire, work)`. `acquire` otwiera zasób implementujący
`Disposable`, a `work` używa go i zwraca wynik.

Wymagania:

- użyj deklaracji `using`,
- zwolnij zasób po sukcesie i po wyjątku,
- zachowaj generyczny typ zasobu i wyniku,
- nie pisz ręcznego `try/finally`,
- nie wywołuj `[Symbol.dispose]` bezpośrednio.

To zadanie polega na związaniu czasu życia zasobu ze scope funkcji.
