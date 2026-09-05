# Hard - zapisz outbox dopiero po sukcesie dokumentu

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Główna różnica między document middleware a surowym lifecycle hookiem:
middleware widzi **całą** operację Document Service jako jedną jednostkę,
niezależnie od tego, ile rekordów bazy `next()` poruszy pod spodem (inne
locale, komponenty). To pozwala emitować efekt uboczny (outbox, webhook)
dokładnie raz na wywołanie API, zamiast raz na rekord bazy.

Zaimplementuj `solve(next, emit)`:

- wywołaj `await next()` dokładnie raz;
- gdy `next()` się powiedzie, wywołaj `emit(result)` z jego wynikiem
  i zwróć ten wynik wywołującemu;
- gdy `next()` rzuci błąd, **nie wywołuj** `emit` w ogóle - błąd
  propaguje się dalej, niezmieniony;
- liczba zapisanych rekordów bazy wewnątrz `next()` (np. 3 warianty
  locale jednego dokumentu) nie ma wpływu na liczbę wywołań `emit` -
  ma być dokładnie jedno, na cały dokument.
