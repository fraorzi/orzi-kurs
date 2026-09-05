# Capstone - pionowa publikacja oferty (node + strapi + mysql)

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Zadanie jest **wieloplikowe**. Uzupełnij `src/use-case.ts`; `src/types.ts`
i `src/index.ts` są gotowe. Wszystkie granice (auth, inventory, CMS, storage,
cache, log) są wstrzyknięte przez `Dependencies` - testujesz pełny use-case
bez prawdziwych usług.

Sprzedawca publikuje ofertę jednym wywołaniem. Operacja dotyka czterech
warstw i musi być odporna: idempotentna, autoryzowana, walidowana, z rezerwacją
zapasu i kompensacją przy awarii.

Zaimplementuj `publishOffer(dependencies, input)` w kolejności:

1. **idempotencja**: jeśli `findResult(idempotencyKey)` zwraca wynik,
   zwróć go i **nie wykonuj żadnego efektu**;
2. **authz**: tylko zalogowany `seller` - inaczej błąd (bez ujawniania,
   czy zasób istnieje);
3. **walidacja runtime**: `title` to string po trim ≥ 3 znaki, `quantity`
   to dodatnia liczba całkowita - inaczej błąd, przed jakimkolwiek efektem;
4. **rezerwacja**: `reserve(quantity)` przed dotknięciem CMS;
5. **CMS**: `createDraft` → `publish`;
6. **zapis wyniku**: `saveResult(key, result)` (dla idempotencji następnych
   wywołań);
7. **rewalidacja**: precyzyjne tagi `offers` i `offer:<documentId>`;
8. **log**: zdarzenie bez danych wrażliwych;
9. **kompensacja**: gdy CMS (lub dalszy krok) zawiedzie po rezerwacji,
   wykonaj `release(quantity)` i **nie** zapisuj wyniku - rethrow błędu.

## Kryteria akceptacji

- ścieżka sukcesu ma dokładną kolejność efektów (reserve → draft → publish
  → save → rewalidacja → log),
- powtórka z tym samym kluczem nie wykonuje efektów,
- awaria CMS zostawia zapas zwolniony i brak zapisanego wyniku,
- authz i walidacja nie wykonują żadnego efektu.
