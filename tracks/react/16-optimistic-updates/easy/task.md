# Polubienie z natychmiastowym UI i rollbackiem

Zaimplementuj `LikeButton`.

Komponent startuje od `initialLiked`. Kliknięcie ma natychmiast zmienić
`aria-pressed` i tekst przycisku, jeszcze zanim zakończy się `saveLike(nextLiked)`.

Po sukcesie ustaw wartość bazową na wynik zwrócony przez `saveLike`. Po odrzuceniu
Promise optimistic state ma wrócić do poprzedniej wartości i pokazać alert
`Nie udało się zapisać polubienia.`.

Użyj `useOptimistic` wewnątrz `startTransition`.
