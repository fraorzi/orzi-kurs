# [D] Napraw granicę Client Component w pliku zbiorczych eksportów

Tryb: naprawa. W `src` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

`src/index.ts` ma `"use client"`, przez co zarówno interaktywny `FilterButton`, jak
i serwerowy `MetricsPanel` trafiają do kod wysyłany do przeglądarki. `MetricsPanel` importuje
chroniony moduł dostępu do danych (DAL) i nie może być klientem.

Usuń dyrektywę z pliku zbiorczych eksportów, dodaj ją wyłącznie do `FilterButton.tsx`. Zachowaj
re-eksporty, interakcję filtra oraz `server-only` w module dostępu do danych (DAL). Nie zmieniaj panelu metryk
na klienta i nie usuwaj ochrony modułu danych.
