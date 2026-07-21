# Hard — migracja widgetu na Server Components

Widget listy faktur ma dyrektywę `"use client"` i pobiera surowe dane po
mount — łącznie z polem `secret` i statusem draftu, których UI nigdy nie
powinien zobaczyć. Bundle rośnie, a draft-y bywają widoczne przez ułamek
sekundy przed przefiltrowaniem po stronie klienta.

## Wymagania

- `loadWidgetItems` (warstwa serwera) odrzuca rekordy `status: "draft"` i
  zwraca tylko `id`, `title`, `createdAt` — bez `secret`, bez `status`, bez
  obiektu `Date` (musi być serializowalny do JSON).
- `Widget` (warstwa klienta) dostaje już zminimalizowane dane przez propsy i
  filtruje je lokalnie po wpisywanym tekście — to jedyna interakcja.
- Pole filtra ma czytelną dla asystujących technologii etykietę.

## Przypadki brzegowe i akceptacja

- Brak dopasowań filtra pokazuje dostępny komunikat (`role="status"`), nie
  pustą listę bez kontekstu.
- `JSON.stringify` wyniku `loadWidgetItems` nie zawiera `secret` ani rzuca
  błędu; filtrowanie i pusty stan działają w renderowanym DOM.
