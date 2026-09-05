# Popraw rewalidację webhooka CMS

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Route Handler odbiera zdarzenie publikacji artykułu. Obecnie wywołuje `updateTag`,
które jest dozwolone tylko w Server Actions.

Po poprawnej autoryzacji i walidacji payloadu użyj `revalidateTag` z
`{ expire: 0 }` dla trzech tagów: globalnej listy `articles`, listy tenantu oraz
szczegółu artykułu. Nie unieważniaj niczego dla błędnego sekretu, JSON-u lub eventu
innego niż `article.published`.
