# Odrzucona Promise, Error Boundary i retry

Zaimplementuj `ReportPanel`.

`loadReport` ma zostać wywołane przy pierwszym renderze. Podczas oczekiwania pokaż
`Ładowanie raportu…`, a po sukcesie nagłówek z tytułem raportu.

Odrzucona Promise ma trafić do Error Boundary, który pokazuje alert
`Nie udało się wczytać raportu.` i przycisk `Spróbuj ponownie`. Retry musi:

1. wywołać `loadReport` ponownie,
2. podmienić Promise czytaną przez `use`,
3. zresetować Error Boundary,
4. ponownie pokazać fallback Suspense i finalnie nowy raport.
