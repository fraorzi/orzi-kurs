# [O] Usuń waterfall niezależnych danych

Tryb: optymalizacja. Popraw istniejący kod w `starter.ts`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

`loadDashboard` zwraca poprawny wynik, ale trace pokazuje, że orders zaczynają się
dopiero po revenue. Uruchom oba loadery przed pierwszym `await` i zaczekaj na nie
razem. Nie zmieniaj kształtu wyniku ani liczby wywołań.

Bramka jakości kontroluje kolejność startu deterministycznymi Promise, nie czasem.
