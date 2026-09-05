# [D] Napraw mismatch zegara po hydratacji

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

`HydrationClock` ignoruje stabilny tekst wygenerowany przez serwer i wywołuje
`getCurrentText()` już podczas renderu. HTML serwera i pierwszy render klienta mogą
się różnić.

Pierwszy render ma zawsze użyć `initialText`. Dopiero po montażu zaktualizuj tekst
wynikiem `getCurrentText`. Nie używaj `suppressHydrationWarning`.
