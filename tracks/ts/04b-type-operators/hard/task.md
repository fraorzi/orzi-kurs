# Hard — projekcja rekordów

Zaimplementuj `projectRows(rows, keys)`, która tworzy nowe obiekty zawierające tylko
wybrane pola.

Sygnatura ma:

- przyjmować readonly listę rekordów,
- odrzucać klucz spoza elementu,
- zwracać `Array<Pick<T, K>>`,
- nie mutować rekordów ani listy kluczy,
- przy pustej liście kluczy zwracać listę pustych obiektów.

To odpowiada warstwie selekcji pól w eksporcie CSV albo odpowiedzi API.
