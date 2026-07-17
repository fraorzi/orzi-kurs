## Hint 1

Zbuduj `PickPath<Model, Path>` dla jednej ścieżki. Dla `a.b` wybierz `a`, a jego
wartość zastąp rekurencyjnym `PickPath<NonNullable<Model["a"]>, "b">`.

## Hint 2

Pozwól typowi warunkowemu rozdzielić się po unii `Paths`. Otrzymasz unię osobnych
kształtów, np. `{ profile: { name: string } } | { profile: { age: number } }`.

## Hint 3

Zamień unię kształtów na przecięcie przez kontrawariantny parametr funkcji. Następnie
rekurencyjny mapped type może uprościć `{ name: string } & { age: number }` do jednego
obiektu i zachować modyfikatory. Przed rozwijaniem obiektów zatrzymaj rekurencję dla
liści domenowych takich jak `Date`.
