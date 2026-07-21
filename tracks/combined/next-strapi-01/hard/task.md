# CRUD Next + Strapi z auth

## Kontekst

Server Action w Next.js aktualizuje artykuł w Strapi. Przysyłany jest tylko
`documentId` i nowy `title` — żądanie może pochodzić z DevTools, nie tylko
z formularza, więc serwer musi sam zweryfikować format danych i uprawnienia,
zanim cokolwiek zapisze.

## Wymagania

- `updateArticle(deps, userId, documentId, title)` weryfikuje `documentId`
  jako 24-znakowy alfanumeryczny identyfikator, zanim wykona zapis.
- `title` musi być stringiem, który po przycięciu białych znaków ma ≥3
  znaki; zapisywana wartość to wersja przycięta.
- Zapis wykonuje się tylko, gdy `deps.owner(documentId) === userId` —
  ownership sprawdza serwer, nie UI.
- Po udanym zapisie rewaliduj dokładnie dwa tagi: `article:<documentId>`
  i `articles`.

## Kryteria akceptacji

- Nieprawidłowy `documentId` lub `title` odrzuca żądanie przed sprawdzeniem
  ownership i przed zapisem.
- Cudzy dokument kończy się błędem `Not found` i zerowymi zapisami.
- Rewalidacja następuje wyłącznie po udanym zapisie.
