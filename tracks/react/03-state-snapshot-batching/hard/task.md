# Aktualizacje po operacji asynchronicznej

Zaimplementuj `DelayedCounter`.

Komponent otrzymuje funkcję `wait`, która reprezentuje niezależną operację
asynchroniczną. Każde kliknięcie przycisku `Dodaj po zakończeniu` ma:

1. wywołać i zakończyć własne `wait()`,
2. po zakończeniu zwiększyć wynik o jeden.

Wynik pokaż w elemencie `output` o nazwie `Wynik`. Jeśli użytkownik uruchomi trzy
operacje przed zakończeniem którejkolwiek, po rozwiązaniu wszystkich wynik ma
wynosić `3`.

Nie blokuj kolejnych kliknięć i nie przenoś licznika poza komponent.
