# Easy — znormalizuj słownik statusów zgłoszeń

Status zgłoszenia (`open`, `in_progress`, `closed`, ...) dziś jest dowolnym
`VARCHAR` bez żadnej kontroli — literówka w kodzie aplikacji (`'oepn'`)
wpada do bazy bez ostrzeżenia, a zmiana nazwy statusu wymaga ręcznego
`UPDATE` po wszystkich wierszach, które go przechowują jako zwykły tekst.
Wydziel status do osobnej tabeli słownikowej i połącz go kluczem obcym.

## Wymagania

- `ticket_statuses(code PRIMARY KEY, label)` — lista dozwolonych statusów.
- `tickets.status` to wymagany (`NOT NULL`) klucz obcy do
  `ticket_statuses.code`.
- `ON UPDATE CASCADE` — zmiana kodu statusu (np. rename `open` → `active`)
  propaguje się automatycznie do wszystkich zgłoszeń, które go używają.
- `ON DELETE RESTRICT` — nie da się usunąć statusu, dopóki choć jedno
  zgłoszenie go używa; status bez żadnego zgłoszenia usuwa się bez
  przeszkód.

Dwie różne akcje referencyjne (`CASCADE` na `UPDATE`, `RESTRICT` na
`DELETE`) to świadomy wybór, nie przeoczenie: zmiana nazwy kodu jest
bezpieczną operacją redakcyjną, a usunięcie całej kategorii statusu — nie.
