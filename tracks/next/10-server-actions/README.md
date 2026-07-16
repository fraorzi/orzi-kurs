# Server Actions: bezpieczna granica mutacji

Server Function oznaczona `"use server"` jest endpointem osiągalnym przez
bezpośredni POST, nawet jeśli w UI przycisk widzą tylko administratorzy. Każda
Action musi więc samodzielnie uwierzytelnić użytkownika, sprawdzić uprawnienie do
konkretnego zasobu i zwalidować `FormData` jako niezaufane dane.

Oczekiwane błędy walidacji i konfliktu zwracaj jako rozłączne stany dla
`useActionState`. Nieoczekiwanej awarii storage nie zamieniaj w komunikat
„nieprawidłowy formularz”. Po udanym zapisie odśwież właściwe tagi, a dopiero potem
wywołaj `redirect`, ponieważ redirect przerywa control flow wyjątkiem frameworka.

## Idempotencja

Ponowienie requestu po utracie odpowiedzi nie może podwójnie obciążyć płatności ani
utworzyć drugiego zamówienia. Klucz idempotencji wiąże jedną intencję z wynikiem.
Repozytorium powinno atomowo zarezerwować klucz, zapisać wynik i dla duplikatu
zwrócić poprzednią odpowiedź. Ten sam klucz z innym payloadem jest konfliktem.

## Kiedy używać

- Formularzy i mutacji należących bezpośrednio do aplikacji Next.
- Progressive enhancement, pending state i jednego roundtripu z odświeżonym UI.
- Authz blisko mutacji, niezależnie od widoczności Client Component.
- Klucza idempotencji dla operacji kosztownych lub ponawianych przez sieć.

## Pułapki

- Ufanie ukrytemu przyciskowi jako autoryzacji.
- Rzutowanie `formData.get("id") as string` bez sprawdzenia `File`, null i formatu.
- Szeroki `catch` zamieniający awarię bazy w expected error.
- Rewalidacja po `redirect` — ten kod się nie wykona.
- Klucz idempotencji przechowywany wyłącznie w pamięci pojedynczego procesu.
- Traktowanie Actions jako mechanizmu równoległego data fetching; dispatch klienta
  jest obecnie sekwencyjny.

## Źródła

- <https://nextjs.org/docs/app/getting-started/mutating-data>
- <https://nextjs.org/docs/app/guides/server-actions>
- <https://nextjs.org/docs/app/guides/data-security>
- <https://react.dev/reference/rsc/use-server>
