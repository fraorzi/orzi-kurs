# Moduł - pionowy feature publikacji artykułu

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Zadanie jest **wieloplikowe**. Uzupełnij `src/backend.ts`; `src/types.ts`
i `src/index.ts` są gotowe. Zależności (Document Service, media, sanitize,
webhook) są wstrzykiwane i odpowiadają rzeczywistym granicom Strapi 5 -
test integracyjny jest szybki, deterministyczny i nie uruchamia panelu.

Redakcja publikuje artykuł jednym wywołaniem: aktualizacja draftu, publikacja
dokumentu we wskazanym locale, opcjonalna okładka, powiadomienie świata.
Kolejność i atomowość efektów są częścią kontraktu.

## Wymagania

1. authz najpierw: tylko `editor`/`admin`; publiczne żądanie kończy się 403
   **bez żadnego efektu ubocznego**;
2. walidacja przed efektami: `documentId` (24 znaki alfanumeryczne), `locale`
   (`pl` albo `pl-PL`), `title` (string, po trim ≥ 3 znaki) - każda porażka
   to 400 z własnym kodem błędu;
3. media: gdy jest `file`, upload przed zapisem; id trafia do `data.cover`;
4. Document Service: `update` draftu (trimowany tytuł), potem `publish` tego
   samego `documentId` + `locale`;
5. odpowiedź przechodzi przez `sanitize` - pola wewnętrzne (np. `secret`)
   nie mogą wyciec;
6. `webhook({ documentId, locale, action: "publish" })` dokładnie raz, po
   sukcesie całości;
7. częściowa awaria po uploadzie sprząta media (`remove`) i zwraca 500
   z generycznym `INTERNAL_ERROR` - bez szczegółów wewnętrznych.

## Kryteria akceptacji

- osie czasu efektów zgodne z testami (upload → update → publish → sanitize
  → webhook),
- walidacja i authz nie wykonują żadnych wywołań zależności,
- kontrakt działa przez rzeczywistą granicę HTTP (withStrapiHttp).
