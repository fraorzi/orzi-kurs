# Migracja widgetu na Server Components

## Kontekst

Widget oznaczony `use client` pobiera dane po mount i wysyła za dużo JavaScriptu, choć interakcją jest tylko mały filtr.

## Decyzje

Serwer pobiera i przygotowuje dane; klient dostaje minimalne serializowalne DTO bez funkcji, sekretów i pełnego rekordu.

## Źródła

- [Dokumentacja](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Dokumentacja](https://react.dev/reference/rsc/server-components)

