# Wyprowadź cookies poza funkcję objętą cache

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

`ProfilePage` jest oznaczony `"use cache"`, ale bezpośrednio czyta `cookies()`. Taki
scope nie może korzystać z request-time API.

Pozostaw odczyt cookie w niecache'owanej `ProfilePage`. Przekaż prosty `sessionId`
do nowego asynchronicznego `CachedProfile`, który ma własne `"use cache"` i profil
`minutes`. To `CachedProfile` powinien wywołać `readProfile(sessionId)`.
