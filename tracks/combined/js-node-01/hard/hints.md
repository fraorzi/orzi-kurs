# Hints

## Hint 1

Rozbij zadanie na dwie niezależne odpowiedzialności: ile zadań może działać
naraz (limit) i co zrobić, gdy pojedyncze zadanie rzuci błąd przejściowy
(retry). Nie mieszaj ich w jednej pętli `for`.

## Hint 2

Do ograniczenia współbieżności użyj wzorca worker pool: uruchom `limit`
(lub mniej, jeśli `items` jest krótsza) równoległych pętli, z których każda
bierze kolejny indeks ze wspólnego licznika, dopóki się nie skończą.

## Hint 3

Retry to osobna funkcja opakowująca pojedyncze wywołanie workera: łap
błąd, sprawdź `error.transient` i licznik prób (max 3), inaczej przepuść
błąd dalej. Wynik zapisuj pod oryginalnym indeksem (`output[index]`), nie
przez `push` — inaczej stracisz kolejność wejściową.
