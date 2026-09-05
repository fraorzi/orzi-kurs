# Powiadomienie bez ponownego łączenia

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `ChatNotifications`.

`chat.connect(roomId, onConnected)` łączy pokój i zwraca cleanup. Gdy połączenie
zgłosi gotowość:

- wywołaj najnowszy `onNotify` z tekstem `Połączono z {roomId}`,
- pomiń powiadomienie, jeśli najnowszy prop `muted` jest równy `true`.

Zmiana `muted` albo identity callbacku `onNotify` nie może ponownie łączyć pokoju.
Zmiana `roomId` ma wykonać cleanup i utworzyć nowe połączenie.
