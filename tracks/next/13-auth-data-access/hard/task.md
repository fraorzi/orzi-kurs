# Zastosuj politykę pól w katalogu zespołu

`getTeamDirectory` ma zwracać katalog wyłącznie członkom tego samego teamu.
Administrator teamu widzi `email`, zwykły member tylko `id` i `name`. Użytkownik z
innego teamu dostaje `Team not found`.

Zbuduj nowe DTO; nigdy nie zwracaj `passwordHash`, `recoveryToken`, `teamId` ani
`role` rekordów. Moduł pozostaje `server-only`.
