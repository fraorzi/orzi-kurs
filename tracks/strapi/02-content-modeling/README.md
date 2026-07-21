# Relacje, komponenty i dynamic zones

Content modeling w Strapi 5 daje trzy narzędzia do wielokrotnego użycia
treści, każde z innym kompromisem. **Relacje** wiążą osobne content types
(`oneToOne`, `oneToMany`, `manyToOne`, `manyToMany`); dwukierunkowa relacja
wymaga jednej strony właściciela — `mappedBy` po stronie zależnej albo
`inversedBy` po stronie głównej — inaczej Strapi nie wie, która tabela
trzyma klucz obcy. **Komponenty** to powtarzalne grupy pól (FAQ, adres,
SEO) osadzone w content type; w repeatable komponencie każdy element ma
techniczne `id`, które nigdy nie powinno wyciekać do warstwy domenowej.
**Dynamic zones** to uporządkowana lista komponentów różnego typu w jednym
polu — sekcja strony złożona z hero, cytatu, galerii w dowolnej kolejności,
rozróżnianych przez dyskryminator `__component`.

Każdy z tych mechanizmów ma osobną pułapkę przy odczycie: relacja bez
jawnego populate nie pojawia się w odpowiedzi REST, komponent z pustymi
elementami trafia do bazy jak każdy inny wpis, a dynamic zone bez
wyczerpującej obsługi `__component` cicho gubi nieznane bloki zamiast
rzucić błąd kompilacji.

## Kiedy używać

- Relacje: gdy dwa content types mają niezależny cykl życia i osobne
  uprawnienia (artykuł i autor, produkt i kategoria).
- Komponenty: gdy ten sam kształt danych powtarza się w wielu miejscach
  jednego content type albo między content types (adres, blok SEO).
- Dynamic zones: gdy strona ma elastyczny układ sekcji, które redakcja
  układa w dowolnej kolejności bez zmiany schematu.

## Kiedy unikać

- Nie modeluj hierarchii z jednym rodzicem jako `manyToMany` — to
  `oneToMany`/`manyToOne`, inaczej dopuszczasz stany, których domena nie
  przewiduje.
- Nie twórz dynamic zone na dwa−trzy stałe bloki, które nigdy się nie
  zmieniają — zwykłe komponenty w stałej kolejności są prostsze do
  walidacji i typowania.
- Nie zostawiaj `populate=*` jako domyślnego kontraktu klienta — limity
  populate i jawna lista relacji trzymają zapytania tanimi (temat 5).

## Pułapki

- Dynamic zone bez wyczerpującego `switch` na `__component` (i gałęzi
  `default: value satisfies never`) cicho ignoruje nowy typ bloku zamiast
  zgłosić błąd kompilacji, gdy ktoś doda komponent.
- Element repeatable komponentu ma pole `id` nadane przez Strapi — trzymanie
  go w modelu domenowym myli tożsamość rekordu z tożsamością encji.
- Relacja `manyToMany` bez `mappedBy`/`inversedBy` po żadnej stronie
  kompiluje się, ale Strapi nie wie, która strona jest właścicielem —
  walidacja schematu musi to wymusić przed zapisem.
- Pusty element komponentu (np. FAQ bez pytania) nie jest błędem zapisu w
  Strapi — trzeba go odfiltrować w warstwie odczytu, jeśli ma nie trafiać
  do klienta.

## Źródła (audyt 2026-07-20, Strapi 5)

- [Backend customization — models](https://docs.strapi.io/cms/backend-customization/models)
- [REST API — populate & select](https://docs.strapi.io/cms/api/rest/populate-select)
- [REST API — relations](https://docs.strapi.io/cms/api/rest/relations)
