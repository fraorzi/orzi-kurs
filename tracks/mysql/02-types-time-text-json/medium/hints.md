## Hint 1

Starter porównuje granice operatorem `BETWEEN`, czyli domkniętym
przedziałem `[start, end]`. Górna granica bez części ułamkowej sekundy
odcina wiersze z niezerowymi mikrosekundami dokładnie w tej sekundzie.

## Hint 2

Zamiast zgadywać maksymalną precyzję końca dnia, złóż zakres
półotwarty: `occurred_at >= początek_doby AND occurred_at <
początek_kolejnej_doby`. Taki zakres składa się z kolejnymi dniami bez
nakładania ani dziury.

## Hint 3

Kształt: `WHERE occurred_at >= '2026-05-01 00:00:00' AND occurred_at <
'2026-05-02 00:00:00' ORDER BY id`. Wiersz dokładnie o północy 2 maja
pokaże, czy górna granica jest naprawdę wyłączna.
