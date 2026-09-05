# Przenieś układ strony workspace'u do właściwego layoutu

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Refaktoruj wieloplikową gałąź `app/`.

Root layout ma odpowiadać wyłącznie za dokument i renderować `children`. Nawigacja
„Workspace” z linkiem do `/reports` należy do layoutu route group `(workspace)`.
Ten layout ma renderować dzieci wewnątrz `main`.

Strona raportów korzysta z colocated prywatnego komponentu `_components/ReportSummary`.
Zachowaj strukturę folderów: route group nie może dodać `/workspace` do URL, a
prywatny komponent nie może stać się trasą.
