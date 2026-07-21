## Hint 1

Trzy niezależne gałęzie, jedna na rolę — `admin` kończy się natychmiast
`true`, reszta logiki dotyczy tylko `editor` i `public`.

## Hint 2

`public` sprawdza `action` i `status` razem (`action === "find" &&
status === "published"`) — pomiń `ownerId` i `userId` całkowicie w tej
gałęzi, publiczny odczyt nie zależy od właściciela.

## Hint 3

`editor` sprawdza `action` i porównanie właściciela razem
(`action === "update" && userId === ownerId`) — brak `userId` (np.
niezalogowany) nigdy nie zrówna się z żadnym `ownerId`, więc nie
potrzebujesz osobnego sprawdzenia na `undefined`.
