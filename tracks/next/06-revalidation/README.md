# Rewalidacja: świeżość po mutacji

Rewalidacja jest kontraktem produktu: określa, kiedy użytkownik może zobaczyć stare
dane i jaki zakres cache'u należy odświeżyć. Next 16 rozdziela trzy API o różnych
semantykach. Nie są synonimami.

`updateTag(tag)` natychmiast wygasza wpis. Może działać wyłącznie w Server Action i
służy scenariuszowi read-your-own-writes: po własnej mutacji użytkownik nie powinien
zobaczyć starego rekordu.

`revalidateTag(tag, "max")` oznacza wpis jako stale. Przy następnym użyciu stara
wersja jest zwracana od razu, a świeża powstaje w tle. To właściwe dla katalogów,
artykułów i danych, gdzie krótka nieaktualność jest akceptowalna. Jednoargumentowa
wersja jest zdeprecjonowana.

Route Handler nie może wywołać `updateTag`. Gdy zewnętrzny webhook naprawdę wymaga
natychmiastowego wygaśnięcia, może użyć `revalidateTag(tag, { expire: 0 })`.

## Zakres ścieżki i danych

`revalidatePath` odświeża konkretną stronę, layout lub wzorzec tras. Dla wzorca z
segmentem dynamicznym wymagany jest typ `"page"` albo `"layout"`. Nie odświeża
automatycznie innych stron korzystających z tych samych tagów danych.

Tag działa odwrotnie: obejmuje wpisy danych we wszystkich trasach, ale nie opisuje
całego drzewa layoutu. W realnej mutacji czasem potrzebne są oba mechanizmy, jednak
powinno to wynikać z jawnego zakresu, nie z defensywnego czyszczenia wszystkiego.

## Kiedy używać

- `updateTag` po Server Action, gdy autor zmiany ma natychmiast zobaczyć wynik.
- `revalidateTag(tag, "max")` dla background refresh i wielu konsumentów danych.
- `revalidateTag(tag, { expire: 0 })` w Route Handlerze tylko przy wymaganej
  natychmiastowej spójności z zewnętrznego źródła.
- `revalidatePath` dla konkretnego route output lub drzewa layoutu.

## Pułapki

- `revalidateTag(tag)` bez drugiego argumentu — to zdeprecjonowane zachowanie.
- `updateTag` w Route Handlerze, Proxy lub Client Component.
- SWR po własnej mutacji, gdy UI obiecuje natychmiast widoczny zapis.
- Odświeżenie tylko `/products`, gdy ten sam tag zasila również dashboard.
- Dynamiczny wzorzec ścieżki bez argumentu `"page"` lub `"layout"`.
- Globalne czyszczenie cache'u po każdej drobnej zmianie.

## Źródła

- <https://nextjs.org/docs/app/getting-started/revalidating>
- <https://nextjs.org/docs/app/api-reference/functions/updateTag>
- <https://nextjs.org/docs/app/api-reference/functions/revalidateTag>
- <https://nextjs.org/docs/app/api-reference/functions/revalidatePath>
