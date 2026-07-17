# Zbuduj poprawny root layout

Napraw domyślny eksport `RootLayout`.

Root layout ma zwracać `html` z `lang="pl"`, zawierać `body`, dostępny link
„Przejdź do treści” oraz `main#main-content` z przekazanym `children`.

Nie dodawaj `"use client"`; layout nie potrzebuje stanu ani API przeglądarki.
