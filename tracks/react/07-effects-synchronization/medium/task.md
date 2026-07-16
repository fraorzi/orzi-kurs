# Subskrypcja wiadomości zależna od pokoju

Zaimplementuj `RoomMessages`.

`source.subscribe(roomId, listener)` uruchamia subskrypcję i zwraca funkcję
odpinającą listener. Komponent pokazuje ostatnią wiadomość w elemencie `output`
o nazwie `Ostatnia wiadomość`.

Po zmianie `roomId` stara subskrypcja ma zostać odpięta, a nowa uruchomiona.
Wiadomości ze starego pokoju nie mogą już zmieniać UI. Odłącz listener także przy
unmountcie.
