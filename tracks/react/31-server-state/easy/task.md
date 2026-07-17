# Rozdziel cache list według filtra

Napraw `ProjectList`. `fetchProjects` zależy od `status`, więc filtr musi być częścią
`queryKey`. Dane mają pozostać świeże przez minutę, aby powrót do wcześniej
odwiedzonego filtra używał cache'u bez kolejnego requestu.

Przekaż `signal` otrzymany przez `queryFn` do funkcji API. Zachowaj osobne stany
ładowania, błędu i pustej listy.
