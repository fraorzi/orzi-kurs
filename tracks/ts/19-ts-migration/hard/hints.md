## Hint 1

Najpierw wybierz dwa prefiksy poleceń zależne od package managera: instalację oraz
`pnpm exec` albo `npx`.

## Hint 2

Zbuduj wynik przez tablicę i spready. Blockery mapuj do kroków `fix`, a narzędzia
podziel przez `needsCompilerApi`.

## Hint 3

TS 6 uruchom przed narzędziami API i z `--stableTypeOrdering`. TS 7 uruchom później
przez zwykłe `tsc`; dopiero po nim dodaj narzędzia, które nie potrzebują API.
