## Hint 1

`import "server-only";` umieść na początku pliku DAL, przed pozostałymi importami.

## Hint 2

Client Component powinien importować tylko typ `CustomerSummary` z `types.ts`.

## Hint 3

Server page wywołuje loader i przekazuje do klienta gotowy, ograniczony DTO.

## Hint 4

Nie wystarczy nie wywoływać serwerowej funkcji — sam value import tworzy zależność.
