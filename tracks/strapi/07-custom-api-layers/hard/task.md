# Hard - utrzymaj niezmiennik w custom service

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zmiana adresu URL artykułu (slug) ma własne reguły niezależne od `ctx`:
normalizacja, format i unikalność. Zaimplementuj
`solve(repo, documentId, slug)`:

- znormalizuj `slug`: przytnij białe znaki i zamień na małe litery;
- zwaliduj format: wyłącznie `[a-z0-9]` w segmentach rozdzielonych
  pojedynczym myślnikiem (bez segmentów pustych, bez wiodącego/końcowego
  myślnika) - inny kształt rzuca błąd wspominający "slug", **zanim**
  cokolwiek zostanie zapisane;
- sprawdź konflikt przez `repo.exists(normalized, documentId)` -
  `documentId` wyklucza edytowany dokument z porównania, więc zapis
  niezmienionego sluga się nie wywala; konflikt rzuca błąd wspominający
  "zajęty" i **nie** woła `repo.update`;
- po przejściu obu sprawdzeń zapisz przez
  `repo.update(documentId, { slug: normalized, status: "draft" })` -
  zmiana sluga zawsze cofa dokument do stanu roboczego, wymagając
  ponownej publikacji.
