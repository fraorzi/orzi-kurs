# Kryptografia użytkowa i sekrety

Nie projektujesz tu algorytmów — używasz właściwych prymitywów z `node:crypto`
do trzech codziennych zadań:

**Tokeny.** Identyfikatory sesji, klucze API, kody resetu haseł generuje się
z **CSPRNG**: `crypto.randomBytes`. `Math.random` nie jest kryptograficzne —
jego stan da się przewidzieć. Entropia to liczba bajtów (16+ dla tokenów),
a `base64url` to bezpieczny format do URL-i i nagłówków (bez `+`, `/`, `=`).

**Porównywanie sekretów.** Zwykłe `===` na stringach kończy porównanie na
pierwszej różnicy — czas odpowiedzi zdradza, ile znaków się zgadza (timing
attack). `crypto.timingSafeEqual(a, b)` porównuje w czasie stałym, ale ma
twardy warunek: **bufory równej długości**, inaczej rzuca. Stąd kontrakt:
najpierw walidacja formatu i długości (zwróć `false`), dopiero potem
porównanie stałoczasowe.

**Hasła i klucze z sekretów.** Haseł nie hashuje się szybkim SHA-256 —
atakujący liczy miliardy takich hashy na sekundę. `crypto.scrypt` jest
celowo kosztowny (pamięć + CPU). Wzorzec przechowywania: losowa **sól** na
rekord + klucz wyprowadzony ze `scrypt(secret, salt)`, zapisane razem
(`salt:key`). Weryfikacja wyprowadza klucz z kandydata **tą samą solą**
i porównuje stałoczasowo.

## Kiedy używać

- `randomBytes`: każdy token, którego zgadnięcie coś daje atakującemu.
- `timingSafeEqual`: porównania podpisów HMAC, kluczy API, tokenów.
- `scrypt`: hasła użytkowników i klucze wyprowadzane z sekretów o niskiej
  entropii.

## Kiedy unikać

- Nie implementuj własnych schematów — komponuj prymitywy z `node:crypto`
  według udokumentowanych wzorców.
- Nie używaj SHA-256/MD5 do haseł; nie używaj `Math.random` do niczego,
  co dotyka bezpieczeństwa.
- Nie porównuj sekretów przez `===` ani `Buffer.equals` (short-circuit).

## Pułapki

- `timingSafeEqual` na buforach różnej długości **rzuca** — a ścieżka błędu
  też nie może zdradzać długości; walidacja przed porównaniem.
- Sól musi być losowa per rekord — wspólna sól umożliwia atak tablicą.
- `scrypt` jest asynchroniczny nie bez powodu: wersja sync blokuje event loop
  na dziesiątki milisekund.
- Base64 zwykłe a `base64url` to różne alfabety — do URL-i tylko to drugie.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [Crypto](https://nodejs.org/download/release/latest-v24.x/docs/api/crypto.html)
- [crypto.timingSafeEqual](https://nodejs.org/download/release/latest-v24.x/docs/api/crypto.html#cryptotimingsafeequala-b)
- [crypto.scrypt](https://nodejs.org/download/release/latest-v24.x/docs/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback)
