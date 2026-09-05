# Usuń cache wymagany do poprawności

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

`SearchResults` został wyłączony z React Compilera przez `"use no memo"`.
Wewnętrzny cache oparty na refie ma błąd: kluczem jest tylko zapytanie, więc po
zmianie `items` przy tym samym zapytaniu UI pokazuje nieaktualny wynik.

Usuń dyrektywę i ręczny cache. Oblicz wynik jako czystą funkcję bieżących propsów.
Nie dodawaj `useMemo`; React Compiler ma sam zoptymalizować poprawny komponent.

Filtrowanie pozostaje niewrażliwe na wielkość liter.
