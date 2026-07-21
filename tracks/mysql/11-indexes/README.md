# Indeksy B-tree

Sekundarny indeks w InnoDB to osobne drzewo B-tree: liście trzymają
zaindeksowane kolumny w posortowanej kolejności, a na końcu każdego wpisu —
wartość klucza głównego. Szukanie po indeksie to dwa kroki: najpierw seek
w drzewie indeksu, potem (jeżeli zapytanie potrzebuje kolumn spoza indeksu)
drugi odczyt w drzewie klucza głównego po znalezionym PK. Ten drugi krok —
"lookup do tabeli" — to koszt, którego covering index pozwala uniknąć.

Kolejność kolumn w indeksie złożonym nie jest kosmetyką, tylko częścią
kontraktu. Indeks `(tenant_id, status, created_at, id)` obsługuje zapytania
filtrujące po `tenant_id`, po `tenant_id AND status`, po
`tenant_id AND status ORDER BY created_at`, bo każdy z tych przypadków to
**leftmost prefix** — ciągły prefiks kolumn od lewej. Ten sam indeks nie
pomoże zapytaniu filtrującemu tylko po `status` (bez `tenant_id`) ani
sortowaniu tylko po `id` — brakuje leworęcznego prefiksu. Zasada projektowa:
najpierw kolumny równości (zawężają zakres do garści wierszy), potem kolumna
zakresu/sortowania (utrzymuje porządek bez `filesort`), na końcu
tie-breaker unikalny (zwykle PK), jeżeli sortowanie ma być deterministyczne
przy remisach.

Indeks nie jest bezpłatny: każdy `INSERT`/`UPDATE`/`DELETE` aktualizuje
każdy indeks tabeli. Indeks na kolumnie, której żadne realne zapytanie nie
filtruje ani nie sortuje, to czysty koszt zapisu bez korzyści odczytu —
stąd projektowanie indeksu zaczyna się od konkretnego kształtu zapytania,
nie od "zaindeksujmy wszystko na wszelki wypadek".

## Kiedy używać

- Gdy znasz dokładny kształt zapytania produkcyjnego (które kolumny są
  w `WHERE` jako równość, które w `ORDER BY`) i chcesz zamienić pełny skan
  tabeli na range/ref scan.
- Composite index zamiast kilku pojedynczych, gdy zapytania łączą te same
  kolumny w filtrach — jeden dobrze uporządkowany indeks obsłuży więcej
  przypadków niż suma osobnych.
- Covering index, gdy wiersz jest szeroki (dużo kolumn albo `TEXT`), a
  zapytanie potrzebuje tylko garści z nich — indeks-only scan omija odczyt
  danych z klastrowanego indeksu.

## Kiedy unikać

- Nie dokładaj indeksu na kolumnę o niskiej selektywności (np. `BOOLEAN`,
  status z dwiema wartościami) jako jedyną kolumnę — optimizer i tak wybierze
  pełny skan, bo indeks nie odetnie wystarczająco wierszy.
- Nie twórz indeksu, który jest prefiksem już istniejącego dłuższego indeksu
  — `(tenant_id)` obok `(tenant_id, status)` jest zbędny, bo leftmost prefix
  drugiego pokrywa pierwszy.
- Nie indeksuj "na zapas" kolumn bez zapytania, które faktycznie ich
  potrzebuje — to czysty narzut na każdy zapis bez korzyści.

## Pułapki

- Kolejność kolumn ma znaczenie: indeks `(created_at, tenant_id)` nie pomoże
  zapytaniu `WHERE tenant_id = ? ORDER BY created_at`, bo `tenant_id` nie
  jest leworęcznym prefiksem.
- Na małych tabelach testowych optimizer często wybiera pełny skan nawet
  z poprawnym indeksem — koszt seek + lookup bywa wyższy niż odczyt kilku
  wierszy. Dlatego weryfikację indeksu robi się przez
  `information_schema.statistics` (czy indeks istnieje i ma właściwe
  kolumny) oraz `EXPLAIN ... FORCE INDEX(...)` (czy dany indeks w ogóle daje
  dostęp inny niż pełny skan) — nigdy przez pomiar czasu zapytania.
- Sam fakt istnienia indeksu niczego nie gwarantuje — trzeba sprawdzić
  `EXPLAIN`, żeby wiedzieć, czy optimizer go w ogóle bierze pod uwagę.
- Covering index wymaga, żeby WSZYSTKIE kolumny z `SELECT`, `WHERE`
  i `ORDER BY` były w indeksie — zabraknie jednej i `Extra` w `EXPLAIN`
  przestaje pokazywać `Using index`, bo silnik i tak musi zajrzeć do
  klastrowanego indeksu.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [How MySQL Uses Indexes](https://dev.mysql.com/doc/refman/8.4/en/mysql-indexes.html)
- [Multiple-Column Indexes](https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html)
- [Verifying Index Usage](https://dev.mysql.com/doc/refman/8.4/en/verifying-index-usage.html)
- [InnoDB Index Types](https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html)
