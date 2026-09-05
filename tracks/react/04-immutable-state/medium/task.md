# Edycja koszyka

Tryb: uzupełnienie. W `starter.tsx` jest gotowy szablon. Zaimplementuj brakującą logikę opisaną poniżej.

Widok `ShoppingCart`, stan i obsługa przycisków są gotowe.
Napisz dwie funkcje używane przez ten widok:

- `increaseQuantity(items, id)` zwraca nową tablicę. Produkt o podanym `id`
  ma być nowym obiektem z ilością większą o 1. Pozostałe obiekty zachowują swoje referencje.
- `removeItem(items, id)` zwraca nową tablicę bez produktu o podanym `id`.
  Obiekty pozostających produktów zachowują swoje referencje.

Obie funkcje pozostawiają wejściową tablicę i jej produkty bez zmian.
Nieznane `id` nie zmienia zawartości koszyka.

Przykład: koszyk zawiera klawiaturę w ilości 1 i mysz w ilości 2.
Po kliknięciu `Zwiększ Klawiatura` obie ilości wynoszą 2.
Po kliknięciu `Usuń Mysz` zostaje tylko klawiatura.

Samo skopiowanie tablicy po `item.quantity += 1` nie wystarczy, bo zmienia stary obiekt.
