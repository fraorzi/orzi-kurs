## Hint 1

`selected` zmienia się tylko dla klikniętego wiersza, ale inline callback rodzica
ma nową referencję dla każdego produktu.

## Hint 2

Utwórz jeden `handleSelect(id)` przez `useCallback`, a ID przekaż z handlera
kliknięcia wewnątrz wiersza.

## Hint 3

Po opakowaniu `ProductRow` w `memo` stabilne pozostają: obiekt produktu, callback
i callback instrumentacji. Zmienia się wyłącznie boolean wybranego wiersza.

