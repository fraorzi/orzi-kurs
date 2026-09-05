# Autosave zapisujący do starego dokumentu

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Napraw `DocumentTitleSync`.

Effect ma wywołać `saveTitle(documentId, title)` po zamontowaniu oraz po zmianie
którejkolwiek wartości używanej przez proces synchronizacji. Zmiana dokumentu przy
tym samym tytule musi zapisać tytuł pod nowym ID.

Nie wyciszaj `react-hooks/exhaustive-deps` i nie kopiuj propsów do stanu.
