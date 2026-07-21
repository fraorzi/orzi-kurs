# Capstone — pionowa publikacja oferty

Pierwszy z dwóch capstone'ów spinających cały stack. Jeden use-case
przechodzi przez cztery warstwy: autoryzację (node), zapas (mysql),
treść (strapi) i cache/obserwowalność. Modeluje to, co w produkcji nazywa
się „vertical slice" — pełny przepływ jednej operacji biznesowej z
odpornością na częściowe awarie.

## Kontekst

Sprzedawca publikuje ofertę limitowanego produktu. Operacja musi być:
idempotentna (podwójne kliknięcie/retry nie tworzy dwóch ofert),
autoryzowana (tylko sprzedawca), walidowana na granicy runtime (dane z
requestu są nieufne), transakcyjnie spójna z zapasem (rezerwacja przed
publikacją) i odporna na awarię CMS (kompensacja zwalnia zapas). To skrzyżowanie
wzorców z tracków Node (idempotencja, kompensacja), MySQL (rezerwacja zapasu)
i Strapi (draft → publish, precyzyjna rewalidacja).

## Decyzje

- **Idempotency key jako pierwsza bramka.** Sprawdzenie zapisanego wyniku
  przed czymkolwiek innym gwarantuje, że retry zwraca ten sam wynik bez
  powtarzania efektów.
- **Kolejność: authz → walidacja → efekty.** Odrzucenie nieuprawnionego lub
  błędnego żądania nie może dotknąć zapasu ani CMS — inaczej atakujący
  rezerwuje zapas samą próbą.
- **Kompensacja, nie transakcja rozproszona.** CMS i baza to osobne systemy;
  zamiast dwufazowego commitu rezerwujemy zapas, a przy awarii CMS jawnie go
  zwalniamy (`release`). Wynik zapisujemy dopiero po sukcesie publikacji.
- **Rewalidacja po utrwaleniu.** Precyzyjne tagi (`offers`, `offer:<id>`)
  unieważniamy dopiero po `saveResult` — inaczej cache mógłby odświeżyć się
  na stan, którego jeszcze nie ma w storage.

## Pułapki

- Rewalidacja przed zapisem wyniku tworzy okno, w którym cache pokazuje stan
  nieutrwalony.
- Brak kompensacji po awarii CMS zostawia „martwą" rezerwację zapasu.
- Walidacja lub authz po rezerwacji pozwala wyczerpać zapas nieudanymi próbami.
- Log ze szczegółami wejścia (tytuł, dane sprzedawcy) to wyciek — loguj
  identyfikatory, nie treść.

## Źródła (audyt 2026-07-20)

- [Next.js: Updating data (Server Actions, rewalidacja)](https://nextjs.org/docs/app/getting-started/updating-data)
- [Strapi 5: Document Service (draft & publish)](https://docs.strapi.io/cms/api/document-service)
- [MySQL 8.4: COMMIT i transakcje](https://dev.mysql.com/doc/refman/8.4/en/commit.html)
