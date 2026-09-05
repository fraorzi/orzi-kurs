# Rozdziel cache list według filtra

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Napraw `ProjectList`. `fetchProjects` zależy od `status`, więc filtr musi być częścią
`queryKey`. Dane mają pozostać świeże przez minutę, aby powrót do wcześniej
odwiedzonego filtra używał cache'u bez kolejnego requestu.

Przekaż `signal` otrzymany przez `queryFn` do funkcji API. Zachowaj osobne stany
ładowania, błędu i pustej listy.
