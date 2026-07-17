# Niemutowalne aktualizacje obiektów i tablic

Obiekty i tablice przechowywane w stanie traktuj jak wartości tylko do odczytu.
Zmiana pola istniejącego obiektu nie informuje Reacta, że powstał nowy stan:

```tsx
score.home += 1;
setScore(score);
```

Setter dostał tę samą referencję, a wcześniejsze snapshoty zostały zmienione pod
spodem. Zamiast tego utwórz nową wartość:

```tsx
setScore((current) => ({
  ...current,
  home: current.home + 1,
}));
```

## Tablice

Do typowych operacji używaj metod zwracających nowe tablice:

- dodawanie: `[...items, newItem]`,
- usuwanie: `items.filter(...)`,
- zmiana elementu: `items.map(...)`,
- sortowanie: `items.toSorted(...)` albo kopia przed `sort`.

`push`, `pop`, `splice`, `sort` i przypisanie `items[index] = ...` mutują istniejącą
tablicę.

## Kopiowanie jest płytkie

Spread kopiuje tylko jeden poziom. Przy zmianie zagnieżdżonego pola trzeba utworzyć
nowe wartości na całej ścieżce od zmiany do korzenia:

```tsx
setProject((current) => ({
  ...current,
  settings: {
    ...current.settings,
    isPublic: true,
  },
}));
```

Nie trzeba kopiować gałęzi, które się nie zmieniły. Zachowanie ich referencji jest
ważne dla przewidywalności i późniejszych optymalizacji.

## Projektowanie kształtu stanu

Jeśli prosta aktualizacja wymaga kopiowania wielu głęboko zagnieżdżonych poziomów,
rozważ spłaszczenie lub normalizację danych. Immer bywa użyteczny w dużych
strukturach, ale nie zastępuje rozumienia, która część danych ma być nową wartością.

## Kiedy używać

- Twórz nowy obiekt lub tablicę przy każdej semantycznej zmianie stanu.
- Używaj updatera, jeśli zmiana zależy od bieżącej kolekcji.
- Zachowuj niezmienione referencje tam, gdzie dane naprawdę się nie zmieniły.

## Kiedy unikać

- Nie mutuj danych wejściowych otrzymanych w propsach.
- Nie kopiuj całego grafu danych „na wszelki wypadek”.
- Nie zapisuj w stanie głęboko zagnieżdżonej struktury, jeśli można przechować ID
  i płaskie indeksy.

## Pułapki

- `[...items]` tworzy nową tablicę, ale obiekty wewnątrz nadal są tymi samymi obiektami.
- `sort()` i `reverse()` mutują tablicę, mimo że zwracają ją jako wynik.
- Mutacja może ujawnić się dopiero przy innym renderze i wyglądać jak losowy bug.
- Płytkie `Object.freeze` nie zamraża automatycznie zagnieżdżonych wartości.

## Źródła

- <https://react.dev/learn/updating-objects-in-state>
- <https://react.dev/learn/updating-arrays-in-state>
- <https://react.dev/learn/choosing-the-state-structure>
