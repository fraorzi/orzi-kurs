# Module 02 — operacyjny stan magazynu

Końcowy moduł skleja cache, rewalidację, streaming i obserwowalność w jednym
feature. Katalog jest współdzieloną, cache'owaną daną tenantową. Alerty niskiego
stanu są świeże per request i streamują się niezależnie. Mutacja stanu sprawdza
uprawnienie przy rzeczywistym produkcie, a potem wygasza tag produktu i listy.

Instrumentacja obejmuje operację domenową spanem i strukturalnym logiem, ale
przepuszcza wyłącznie allow-listę atrybutów. Testy używają mocków na granicy store,
cache i telemetry; nie wymagają serwera ani sieci.

## Kiedy używać

- `use cache` dla współdzielonych danych z jawnym lifetime i tagami tenantów.
- Oddzielnych Suspense dla sekcji o niezależnej świeżości i czasie odpowiedzi.
- `updateTag` po mutacji wymagającej read-your-own-writes.
- Spanów i logów wokół operacji, które mają znaczenie dla SLO.

## Pułapki

- Globalny tag katalogu bez izolacji tenanta.
- Cache funkcji przyjmującej nieistotne request ID albo sekrety.
- Authz na tenant ID z formularza zamiast na rekordzie produktu.
- Jeden `await Promise.all` przed JSX blokujący cały static shell.
- Telemetry zawierające token, email albo pełny payload.

## Źródła

- <https://nextjs.org/docs/app/getting-started/caching>
- <https://nextjs.org/docs/app/api-reference/functions/cache-tag>
- <https://nextjs.org/docs/app/api-reference/functions/update-tag>
- <https://nextjs.org/docs/app/guides/streaming>
- <https://nextjs.org/docs/app/guides/instrumentation>
