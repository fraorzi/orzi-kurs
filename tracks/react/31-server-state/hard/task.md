# Zaimplementuj optimistic update z rollbackiem

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Uzupełnij `StockControl`. Kliknięcie zmniejszenia ma natychmiast zmienić ilość w
cache'u, jeszcze przed odpowiedzią API.

W `onMutate` anuluj aktywne zapytanie produktu, zapisz poprzedni `Stock`, ustaw
optymistyczną ilość i zwróć snapshot. W `onError` odtwórz poprzednią wartość, a w
`onSettled` unieważnij ten sam dokładny klucz. Pokaż błąd mutacji przez `role="alert"`.

Nie twórz drugiego źródła prawdy w `useState`.
