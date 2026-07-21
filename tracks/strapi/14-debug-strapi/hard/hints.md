## Hint 1

Starter oddaje dokumenty bez zmian — dwa osobne braki: brak filtra statusu
(wyciek draftów) i brak sanitizacji (wyciek `secret`). Napraw oba.

## Hint 2

Filtr: `role === "editor" || doc.status === "published"`. Editor widzi
wszystko, public tylko opublikowane.

## Hint 3

Sanitizacja przez allow-listę, nie blocklistę: destrukturyzuj dokładnie
`{ documentId, status, title, slug }` i zbuduj z nich nowy obiekt — wtedy
żadne przyszłe pole prywatne nie wycieknie przypadkiem.
