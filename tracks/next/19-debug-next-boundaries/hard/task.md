# [D] Przenieś uncached data pod Suspense

`Page` wykonuje `await getActivity()` przed zwróceniem JSX. Granica Suspense
otacza już gotową tablicę, więc nie chroni static shell i nie streamuje danych.

Przenieś odczyt do osobnego async `Activity`, renderowanego wewnątrz istniejącej
granicy. Eksportowana `Page` ma być synchroniczna, aby nagłówek był dostępny od razu.
Nie cache'uj danych, bo aktywność jest celowo świeża per request.
