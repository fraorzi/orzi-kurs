# Hard — pokaż hierarchię pracowników

Panel HR pokazuje każdego pracownika razem z emailem jego bezpośredniego
managera. CEO nie ma managera — to legalny stan struktury firmy, nie
brakujące dane, więc CEO musi zostać na liście z `manager_email = NULL`,
a nie zniknąć z raportu.

Napisz zapytanie, które:

- łączy `employees` samą ze sobą przez dwa aliasy — jeden w roli
  pracownika, drugi w roli managera,
- zwraca `email` pracownika i `manager_email` — email jego
  bezpośredniego managera, nie całego łańcucha przełożonych,
- zachowuje w wyniku pracownika bez managera (`manager_id IS NULL`) z
  `manager_email = NULL`,
- sortuje wynik rosnąco po `id` pracownika.

Starter łączy `employees` samą ze sobą przez `INNER JOIN` — pracownik
bez managera nigdy nie znajdzie dopasowania po stronie `m`, więc znika
z wyniku zamiast zostać z `NULL`.
