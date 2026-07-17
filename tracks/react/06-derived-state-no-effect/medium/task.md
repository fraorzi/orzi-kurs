# Lista filtrowana z jednego źródła prawdy

Zaimplementuj `ProductFilter`.

Komponent otrzymuje `products` i ma kontrolowane pole `Filtruj produkty`. Lista
`Produkty` pokazuje rekordy, których nazwa zawiera query bez rozróżniania wielkości
liter.

W stanie przechowuj tylko query. Widoczne produkty wyliczaj podczas każdego renderu,
aby lista reagowała zarówno na wpisywanie, jak i na nowe propsy od rodzica. Nie używaj
efektu ani osobnego stanu na wynik filtrowania.
