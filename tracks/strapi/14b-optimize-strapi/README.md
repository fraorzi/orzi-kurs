# [O] Optymalizacja zapytań i cache w Strapi 5

Zadania `[O]` mają inną bramkę: **starter działa poprawnie**, oblewa tylko
testy oznaczone `[quality]`, które mierzą pracę deterministycznie (liczba
pobranych pól, liczba wywołań zależności, precyzja tagów cache) — nigdy
czasem. To odpowiada realnej pracy: endpoint zwraca poprawne dane, a mimo to
przeciąża bazę i CDN.

Trzy klasy problemów wydajnościowych Strapi 5:

**Nadmiarowy fetch.** REST API domyślnie nie populate'uje relacji, ale gdy
już zawężasz zapytanie, `populate: "*"` i pełna lista `fields` ściągają
kolumny i relacje, których widok nie używa. Precyzyjny `fields` + jawny
`populate` z własnymi `fields` na relacji to różnica rzędu wielkości w
rozmiarze odpowiedzi.

**N+1 na relacjach.** Pobieranie powiązanych rekordów w pętli (jedno
zapytanie na id) to klasyczny N+1. Batch po unikalnych id + remapowanie
wyniku na wejściową listę utrzymuje jedno zapytanie niezależnie od liczby
elementów, zachowując kolejność i duplikaty.

**Zbyt szeroka rewalidacja cache.** Po publikacji trzeba unieważnić dokładnie
to, co się zmieniło: dokument, listę w danym locale, ewentualnie kategorię.
Globalny purge (`content`) wywraca cały cache przy każdej edycji — poprawny,
ale marnotrawny. Precyzyjne tagi to podstawa działającego stale-while-revalidate.

## Jak podchodzić do zadań [O]

1. Przeczytaj starter — definiuje kontrakt funkcjonalny do zachowania.
2. Uruchom testy: zielona poprawność, czerwone `[quality]` mówi, co jest mierzone.
3. Zawężaj zapytanie / batchuj / precyzuj tagi — nie zmieniaj kontraktu danych.

## Kiedy używać tych technik

- Przy każdym endpoincie listy/detalu, który realnie obsługuje ruch.
- Gdy profil pokazuje duże odpowiedzi REST albo lawinę zapytań na relacje.
- Gdy publikacja jednego wpisu wywraca cały cache strony.

## Kiedy unikać

- Nie zawężaj `fields` tak, że widok traci potrzebne dane — poprawność ma
  pierwszeństwo nad rozmiarem.
- Nie batchuj, gdy zależność nie przyjmuje wielu id (wtedy problem jest
  w kontrakcie zależności, nie w pętli).
- Nie rozdrabniaj tagów cache tak, że rewalidacja przestaje trafiać w listę.

## Pułapki

- `populate: "*"` jest wygodne w developmencie i kosztowne na produkcji.
- Batch musi deduplikować id, ale remapować na oryginalną listę (z duplikatami
  i kolejnością) — inaczej gubisz elementy.
- Globalny tag `content` unieważnia wszystko; precyzyjne tagi (`article:<id>`,
  `articles:<locale>`) rewaliduje tylko to, co trzeba.

## Źródła (audyt 2026-07-20, Strapi 5)

- [REST API: population & field selection](https://docs.strapi.io/cms/api/rest/populate-select)
- [REST API parameters](https://docs.strapi.io/cms/api/rest/parameters)
- [Document Service API](https://docs.strapi.io/cms/api/document-service)
