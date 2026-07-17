# [D] Napraw granicę Client Component w barrelu

`src/index.ts` ma `"use client"`, przez co zarówno interaktywny `FilterButton`, jak
i serwerowy `MetricsPanel` trafiają do client module graph. `MetricsPanel` importuje
chroniony DAL i nie może być klientem.

Usuń dyrektywę z barrellu, dodaj ją wyłącznie do `FilterButton.tsx`. Zachowaj
re-eksporty, interakcję filtra oraz `server-only` w DAL. Nie zmieniaj panelu metryk
na klienta i nie usuwaj ochrony modułu danych.
