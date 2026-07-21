# Document middleware i lifecycle hooks

Strapi 5 daje dwa różne miejsca, w których można dopisać zachowanie wokół
zapisu — i mylenie ich to najczęstsze źródło duplikowanych efektów
ubocznych w tym temacie.

**Document Service middleware** (`(context, next) => next(context)`,
rejestrowane przez `strapi.documents.use(...)`) widzi **całą** operację
API: `context.uid`, `context.action` (`findMany`, `findOne`, `create`,
`update`, `delete`, `publish`, `unpublish`, `discardDraft`...) i
`context.params`. Middleware może zmienić `params` przed `next()` i wynik
po nim — i robi to **raz na wywołanie**, niezależnie od tego, ile rekordów
bazy `next()` porusza pod spodem.

**Lifecycle hooks** (`beforeCreate`, `afterCreate`, `beforeUpdate`...)
działają jeden poziom niżej — na warstwie bazy danych. To fundamentalna
zmiana względem v4: ponieważ Draft & Publish oraz i18n reprezentują jeden
dokument jako **wiele** rekordów (osobny wariant na locale, osobny na
draft/published), jedno wywołanie `publish()` może wyzwolić kilka
niezależnych `afterCreate`/`afterDelete` — po jednym na rekord, nie na
dokument. Efekt uboczny podpięty naiwnie pod hook (np. wysyłka webhooka)
wykona się wielokrotnie dla jednej logicznej operacji redakcyjnej.

Stąd zasada: efekty widoczne "na zewnątrz" (webhook, outbox, notyfikacja)
podpinaj pod document middleware, opakowując `next()` — masz gwarancję
jednego wywołania na dokument. Hooki bazy zostaw do rzeczy naprawdę
powiązanych z rekordem (np. audyt per-wariant, walidacja przed zapisem
konkretnego wiersza).

## Kiedy używać

- Document middleware: filtrowanie/wymuszanie parametrów całej operacji
  (np. status published dla publicznego kanału), efekty uboczne raz na
  wywołanie API (outbox, webhook po publikacji).
- Lifecycle hooks: logika ściśle związana z pojedynczym rekordem bazy,
  niezależna od tego, przez ile wariantów locale przejdzie dokument.

## Kiedy unikać

- Nie emituj webhooka ani nie wysyłaj powiadomienia z `afterCreate`/
  `afterUpdate`, jeśli treść ma i18n albo draft/publish — dostaniesz
  duplikaty przy każdej zmianie obejmującej więcej niż jeden rekord.
- Nie próbuj deduplikować efektów lifecycle przez normalizację locale —
  różne locale to uprawnione, osobne zdarzenia, nie szum do scalenia.

## Pułapki

- `publish()` w Strapi 5 potrafi wygenerować hook tworzący nowy draft
  **i** hook kasujący stary published wpis — dwa zdarzenia bazy na jedną
  intencję redakcyjną.
- Document middleware musi zawsze zwrócić wynik `next()` (ewentualnie
  zmodyfikowany) — pominięcie `return` łamie cały łańcuch middleware.
- Deduplikacja eventów lifecycle po samym `documentId` gubi legalne
  różnice — klucz musi zawierać też `action` i `locale`.

## Źródła (audyt 2026-07-20, Strapi 5)

- [Document Service middlewares](https://docs.strapi.io/cms/api/document-service/middlewares)
- [Models: lifecycle hooks](https://docs.strapi.io/cms/backend-customization/models#lifecycle-hooks)
- [v4 → v5: lifecycle hooks breaking change](https://docs.strapi.io/cms/migration/v4-to-v5/breaking-changes/lifecycle-hooks-document-service)
