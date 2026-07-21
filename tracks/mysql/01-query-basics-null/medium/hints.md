## Hint 1

Starter zawsze zwraca zero wierszy: `shipped_at = NULL` daje UNKNOWN
dla każdego wiersza, a `WHERE` przepuszcza wyłącznie TRUE. To nie jest
błąd składni — MySQL wykona to zapytanie bez słowa skargi.

## Hint 2

Do pytania o brak wartości służy `IS NULL`. Status filtruj zwykłym
`=`, oba warunki połącz przez `AND`.

## Hint 3

Kształt: `... WHERE status = 'open' AND shipped_at IS ... ORDER BY id`.
Jeżeli test z samymi otwartymi niewysłanymi zamówieniami dalej widzi
pusty wynik — gdzieś nadal porównujesz NULL przez `=`.
