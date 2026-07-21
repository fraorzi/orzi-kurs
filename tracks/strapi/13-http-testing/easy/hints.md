# Hints

## Hint 1

`new URL(request.url).pathname.split("/").pop()` daje ostatni segment
ścieżki — to Twój `documentId`. `withStrapiHttp` przekazuje realny
`Request`, więc `request.url` jest pełnym URL-em, nie samą ścieżką.

## Hint 2

`store.get(documentId)` zwraca `undefined`, gdy dokumentu nie ma —
sprawdź to **przed** zbudowaniem odpowiedzi. Dwie gałęzie, dwa różne
statusy: nie ma jednej wspólnej ścieżki, która obsłuży oba przypadki.

## Hint 3

Koperta błędu ma dokładnie trzy pola: `status`, `name`, `message` — i
`name` to string `"NotFoundError"`, nie klasa błędu ani `Error` obiekt.
`Response.json(body, { status })` ustawia i status HTTP, i nagłówek
`Content-Type` za Ciebie.
