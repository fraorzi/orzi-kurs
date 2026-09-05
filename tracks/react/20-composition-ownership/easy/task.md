# Dwa zsynchronizowane pola

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `SyncedFields`.

Komponent renderuje pola `Nazwa publiczna` i `Podgląd nazwy`. Zmiana dowolnego
pola ma natychmiast aktualizować oba.

Przenieś jedno źródło prawdy do wspólnego rodzica. Komponent pola ma być
sterowany przez propsy `value` i `onChange`, bez własnego `useState`.
