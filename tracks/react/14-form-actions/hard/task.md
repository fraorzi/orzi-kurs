# Sekwencyjna kolejka Actions

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `SeatReservationCounter`.

Formularz pokazuje `Liczba miejsc`, przycisk `Dodaj miejsce` i podczas pracy
komunikat `Aktualizowanie…`. Każde wysłanie formularza zwiększa liczbę o jeden
i przekazuje oczekiwaną nową wartość do async `saveCount`.

Użyj poprzedniego stanu przekazanego do Action przez `useActionState`. Szybkie dwa
wysłania mają zostać wykonane sekwencyjnie: drugie `saveCount` może wystartować
dopiero po pierwszym i musi bazować na zwróconej przez nie wartości.

Nie blokuj przycisku podczas pending - celem jest obsługa kolejki.
