# Hard — przekrojowy security gate

Endpoint administracyjny przyjmuje token, rolę i licznik prób z warstwy
przed handlerem. Audyt bezpieczeństwa znalazł trzy niezależne dziury:
każdy z tokenem dostaje pełny dostęp bez sprawdzenia roli, nie ma żadnego
limitu prób, a log żądania zawiera surowy `token` i `password` — więc
wyciek logów jest wyciekiem poświadczeń.

## Wymagania

- Uwierzytelnienie (token obecny) jest oddzielone od autoryzacji (rola
  `"editor"`) — jedno bez drugiego nie wystarcza.
- Powyżej progu prób (`attempts >= 10`) żądanie dostaje `429`, niezależnie
  od tego, czy reszta danych jest poprawna — limiter działa przed resztą
  logiki.
- Log zawiera wyłącznie allow-listę pól (`requestId`, `role`, `outcome`) —
  nigdy `token` ani `password`, w żadnej gałęzi decyzji.

## Przypadki brzegowe i akceptacja

- Brak `role` w logu zapisuje się jako `"anonymous"`, nie `undefined`; rate
  limit wygrywa nawet nad poprawnym editorem z ważnym tokenem.
- Cztery statusy (`200`, `401`, `403`, `429`) są rozróżnialne testami, a
  żaden log — dla żadnej kombinacji wejścia — nie zawiera sekretu.
