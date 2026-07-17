# Auth, sesje i Data Access Layer

Authentication potwierdza tożsamość, session management utrzymuje ją między
requestami, a authorization decyduje o konkretnym zasobie i operacji. Cookie może
zawierać minimalny, podpisany identyfikator i rolę do szybkich optimistic checks,
ale bezpieczny check powinien potwierdzić sesję i uprawnienie w bazie.

Cookie sesyjne ustawiaj na serwerze z `httpOnly`, `secure`, `sameSite`, `path` i
wygaśnięciem. Payload nie powinien zawierać emaila, telefonu ani innych danych,
które nie są niezbędne do identyfikacji. Podpis i expiration trzeba zweryfikować
przed zaufaniem jakimkolwiek polom.

## DAL i DTO

DAL jest modułem `server-only`, który centralizuje odczyt sesji, zapytania i authz.
Każda funkcja sprawdza uprawnienie blisko źródła, a nie zakłada, że wywołująca
strona zrobiła to wcześniej. React `cache` może deduplikować weryfikację w jednym
render pass, ale nie zastępuje trwałego cache'u ani revocation check.

DTO zwraca tylko pola potrzebne danemu widokowi. Rola i relacja z zasobem mogą
zmieniać widoczność pól, na przykład email zespołu. Surowy rekord z hashami,
tokenami lub wewnętrznymi kosztami nigdy nie powinien trafić do propsów klienta.

## Kiedy używać

- Biblioteki auth/session zamiast własnej kryptografii w produkcie.
- `server-only` DAL dla nowych aplikacji z bezpośrednim dostępem do bazy.
- Secure authz w DAL, Action i Route Handler; Proxy tylko jako prefiltr.
- DTO per przypadek użycia, nie jednego globalnego modelu „safe user”.

## Pułapki

- Zaufanie roli z niezweryfikowanego cookie.
- Auth check wyłącznie w layoucie, który nie musi rerenderować się przy nawigacji.
- Ukryty przycisk zamiast authz Action.
- Odczyt rekordu po ID bez sprawdzenia właściciela — IDOR.
- Zwracanie całego rekordu i „nieużywanie” sekretnego pola w JSX.
- Cache sesji dłuższy niż jej revocation/expiration policy.

## Źródła

- <https://nextjs.org/docs/app/guides/authentication>
- <https://nextjs.org/docs/app/guides/data-security>
- <https://nextjs.org/docs/app/getting-started/server-and-client-components#preventing-environment-poisoning>
- <https://owasp.org/www-project-top-ten/>
