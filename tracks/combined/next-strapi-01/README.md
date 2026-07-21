# CRUD Next + Strapi z auth

## Kontekst

Server Action to granica zaufania: uruchamia się na serwerze, ale przyjmuje
dowolny payload z klienta — łącznie z payloadem spreparowanym ręcznie
z pominięciem formularza. Projekt modeluje update artykułu w CMS (Strapi)
wywołany z Next.js: warstwa serwerowa musi sama zweryfikować kształt
danych, ponownie sprawdzić ownership (nie ufając UI), wykonać zapis przez
Document Service i precyzyjnie odświeżyć cache — bez rewalidacji całej
strony.

## Decyzje

- Walidacja formatu (`documentId`, `title`) następuje przed sprawdzeniem
  ownership — nie ma sensu odpytywać CMS o właściciela dla identyfikatora,
  który i tak jest nieprawidłowy.
- Ownership sprawdzany server-side przy każdym zapisie, nie tylko przy
  odczycie strony — klient mógł dostać stary link do cudzego dokumentu.
- Błąd dla cudzego dokumentu to `Not found`, nie `Forbidden` — rozróżnienie
  ujawniłoby atakującemu, że dokument o danym ID w ogóle istnieje.
- Rewalidacja dwóch tagów (`article:<id>` i `articles`) zamiast całej
  ścieżki — lista i widok pojedynczego artykułu mają osobne cache'e, obie
  muszą się odświeżyć, ale nic więcej.
- Zapis używa `documentId` (Strapi Document Service), nie numerycznego
  `id` — `documentId` jest stabilny między lokalizacjami i draftem/publish.

## Pułapki

- Ufanie `title` z requestu bez re-walidacji na serwerze — walidacja w UI
  nie chroni przed spreparowanym żądaniem POST.
- Sprawdzenie ownership PO zapisie zamiast przed — jeśli `update` wykona
  się przed `owner`, cudzy dokument jest już zmodyfikowany, zanim błąd
  w ogóle padnie.
- Rewalidacja przed `update` zamiast po — cache odświeży się dla danych,
  które jeszcze nie zostały zapisane.
- Użycie numerycznego `id` zamiast `documentId` w wywołaniach Document
  Service — w Strapi 5 to inny identyfikator i miesza wersje dokumentu.

## Źródła (audyt 2026-07-20)

- [Next.js — Updating data (Server Actions)](https://nextjs.org/docs/app/getting-started/updating-data)
- [Strapi — Document Service API](https://docs.strapi.io/cms/api/document-service)
- [Next.js — revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
