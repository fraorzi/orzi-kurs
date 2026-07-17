## Hint 1

Wzór z dokumentacji AWS: `delay = random() * min(cap, base * 2 ** attempt)`
— "full", bo losowość mnoży cały sufit, nie dodaje marginesu.

## Hint 2

Walidację konfiguracji zrób przed liczeniem; wartość z `random()` sprawdź
po pobraniu, przed użyciem.

## Hint 3

`Math.floor` na końcu — opóźnienia w ms są całkowite, a test porównuje
dokładne wartości.
