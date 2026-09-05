# Polubienie z natychmiastowym UI i rollbackiem

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `LikeButton`.

Komponent startuje od `initialLiked`. Kliknięcie ma natychmiast zmienić
tekst przycisku, jeszcze zanim zakończy się `saveLike(nextLiked)`.

Po sukcesie ustaw wartość bazową na wynik zwrócony przez `saveLike`. Po odrzuceniu
Promise optimistic state ma wrócić do poprzedniej wartości i pokazać alert
`Nie udało się zapisać polubienia.`.

Użyj `useOptimistic` wewnątrz `startTransition`.
