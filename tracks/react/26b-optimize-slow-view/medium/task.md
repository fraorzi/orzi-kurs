# Renderuj tylko wiersz, którego stan wizualny się zmienił

`ProductGrid` działa poprawnie, lecz wybór jednego produktu renderuje wszystkie
wiersze. Zmierzony koszt pojedynczego wiersza uzasadnia ręczną memoizację.

Owiń `ProductRow` w `memo` i przekaż wszystkim wierszom stabilny callback utworzony
przez `useCallback`. Po pierwszym wyborze tylko wybrany wiersz może commitować.
Callback musi nadal wybierać właściwe ID.

