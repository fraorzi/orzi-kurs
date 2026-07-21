# CI, migracje i bezpieczny rollout

## Kontekst

Pipeline CI/CD dla serwisu z bazą danych łączy trzy warstwy: kod, migrację
schematu i kontener. Kolejność kroków nie jest kosmetyką — migracja
uruchomiona przed backupem albo deploy przed testami to najczęstsza
przyczyna nieodwracalnych incydentów. Projekt modeluje bramkę, którą CI
odpala przed startem właściwego pipeline'u: walidator planu release'u,
niezależny od tego, czym pipeline jest wykonywany (GitHub Actions, GitLab CI
czy cokolwiek innego).

## Decyzje

- **Dwa niezależne warunki** — kompletność (czy wszystkie wymagane kroki są
  obecne) i kolejność (czy zachodzą względem siebie we właściwej relacji).
  Rozdzielenie upraszcza diagnozę i pozwala testować każdy warunek osobno.
- **Migracja typu expand** — `migrate-expand` musi nastąpić po `backup`
  i przed `deploy`. Faza expand (dodanie kolumny, nie usunięcie) jest
  bezpieczna do wycofania w tym samym release'u; faza contract celowo nie
  jest tu modelowana.
- **Obraz kontenera jest niezmienny** — `build` produkuje artefakt raz,
  `deploy` go tylko uruchamia, dlatego `test` musi poprzedzać `build`, żeby
  nie zbudować i nie wdrożyć kodu, który nie przeszedł testów.
- **Dodatkowe kroki nie psują walidacji** — plan może zawierać kroki spoza
  wymaganej siódemki (np. `notify-slack`); liczy się wyłącznie względna
  kolejność wymaganych kroków.

## Pułapki

- Sama obecność kroku nie wystarcza — plan z `deploy` na początku i resztą
  kroków po nim wygląda "kompletnie" pod względem zbioru, ale jest
  katastrofalny w praktyce.
- `rollback-ready` nie oznacza, że rollback się wykonał — to tylko
  potwierdzenie, że *da się* wycofać zmianę (np. zachowany poprzedni obraz).
- `indexOf` zwraca `-1` dla nieobecnego kroku. Porównania kolejności trzeba
  wykonać dopiero PO sprawdzeniu kompletności, inaczej `-1` może przypadkowo
  "wygrać" porównanie `<` i ukryć brakujący krok.
- Walidacja samego planu nie gwarantuje, że pipeline faktycznie wykonał
  kroki w tej kolejności — to osobna odpowiedzialność (audyt logów CI).

## Źródła (audyt 2026-07-20)

- [GitHub Actions — Quickstart](https://docs.github.com/en/actions/get-started/quickstart)
- [Docker build — best practices](https://docs.docker.com/build/building/best-practices/)
- [Parallel Change (expand/contract) — Martin Fowler](https://martinfowler.com/bliki/ParallelChange.html)
