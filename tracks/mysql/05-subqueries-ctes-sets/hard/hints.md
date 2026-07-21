## Hint 1

Starter robi jeden krok filtrowania (`parent_id = 1`) i sztywno wpisuje
`depth = 0` — to nie przechodzi drzewa, tylko czyta jeden jego poziom
z błędną etykietą głębokości. Do dowolnej głębokości potrzebujesz CTE
z częścią kotwiczącą (korzeń) i częścią rekurencyjną (kolejne
pokolenia).

## Hint 2

Część kotwicząca wybiera wiersz `id = 1` z `depth = 0`. Część
rekurencyjna łączy `categories` z dotychczasowym wynikiem CTE po
`parent_id = tree.id` i zwiększa `depth` o jeden — `UNION ALL`
zachowuje każdy osiągnięty węzeł bez próby deduplikacji.

## Hint 3

Kształt: `WITH RECURSIVE tree AS (SELECT id, parent_id, name, 0 AS depth FROM
categories WHERE id = 1 UNION ALL SELECT c.id, c.parent_id, c.name,
tree.depth + 1 FROM categories c JOIN tree ON c.parent_id = tree.id)
SELECT id, name, depth FROM tree ORDER BY id`. Kategoria z osobnym,
niepowiązanym drzewem (inny `parent_id IS NULL`) nie powinna pojawić
się w wyniku w ogóle.
