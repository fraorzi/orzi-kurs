# Stabilny kontrakt opcji z zewnętrznym wykresem

`LiveChart` integruje się z biblioteką przez `connectChart(options)`, która zwraca
cleanup. Biblioteka traktuje zmianę referencji obiektu opcji jako zmianę
konfiguracji.

Zbuduj stabilny `options` przez `useMemo`, aby wpisywanie do lokalnego pola
`Tytuł widoku` nie rozłączało wykresu. Zmiana `series` albo `currency` ma nadal
wykonać cleanup starego połączenia i utworzyć nowe.

To zadanie ćwiczy jawny kontrakt referencji, nie memoizację dla poprawności JSX.

