# Hard — ponów całą transakcję po deadlocku

Dwa magazynowe przesunięcia zapasu między tymi samymi dwoma pojemnikami,
wykonane w tym samym momencie, ale w przeciwnych kierunkach, blokują
wiersze w odwrotnej kolejności: jedno trzyma pojemnik A i czeka na B,
drugie trzyma B i czeka na A. InnoDB wykrywa ten cykl i **natychmiast**
przerywa jedną z transakcji (błąd 1213) — to nie jest awaria aplikacji,
tylko oczekiwany produkt uboczny współbieżności, który wymaga ponowienia
całej przerwanej operacji od nowa.

Napisz procedurę `move_stock(p_from, p_to, p_qty)`, która:

- w jednej transakcji zmniejsza `quantity` pojemnika `p_from` i zwiększa
  `quantity` pojemnika `p_to` o `p_qty`,
- przy błędzie 1213 (deadlock) wykonuje `ROLLBACK` **całej** transakcji i
  ponawia ją od `START TRANSACTION` — nie kontynuuje w miejscu przerwania,
  bo InnoDB już wycofał wszystko, co ta transakcja zdążyła zrobić,
- ogranicza liczbę prób (do 3) i sygnalizuje czytelny błąd, jeśli limit
  się wyczerpie, zamiast zapętlić się w nieskończoność,
- z dwóch równoległych wywołań w przeciwnych kierunkach na te same dwa
  pojemniki — obie transakcje docelowo kończą się sukcesem (jedna po
  ponowieniu), a suma zapasu w obu pojemnikach pozostaje niezmieniona,
- daje ten sam, poprawny wynik niezależnie od tego, które z dwóch
  wywołań zostanie wybrane na ofiarę deadlocku — ofiara i tak zostanie
  ponowiona.

Handler musi łapać konkretnie kod `1213`, nie każdy błąd `SQLEXCEPTION` —
inny błąd (np. naruszenie constraintu) nie powinien być cicho ponawiany.
