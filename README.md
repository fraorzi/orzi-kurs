# orzi-kurs

Lokalna apka do nauki JavaScriptu, TypeScriptu, Reacta, Next.js, Node.js, MySQL,
Strapi i Javy oraz do projektów łączących te technologie. Curriculum prowadzi od
wiedzy internowej do praktycznego poziomu mid. Zadania rozwiązujesz we własnym
edytorze, a submit sprawdza je deterministycznie — bez AI w ocenianiu.

## Start

```bash
pnpm install
pnpm dev          # dashboard na http://localhost:3000
```

## Workflow

1. W dashboardzie wybierz track → zagadnienie → przeczytaj teorię (README).
2. Otwórz poziom i edytuj wskazany `starter.*` albo katalog `src/` w swoim edytorze.
3. Kliknij **Submit** — wyniki testów, lint i ewentualne benchmarki pojawią się od razu.
4. Utknąłeś? Odkrywaj hinty pojedynczo.
5. Po zaliczeniu zobaczysz porównanie własnego kodu z rozwiązaniem wzorcowym. Licznik
   prób, użycie hinta, poziom opanowania i termin powtórki zapisują się w `progress.json`.
   Odkryte hinty pozostają widoczne po odświeżeniu; CTA próby bez wskazówek czyści je
   i przywraca pierwotny starter.
6. Jeśli chcesz utrwalić zaliczenie w gicie, uruchom świadomie
   `pnpm commit:task <taskId>`. Submit nigdy nie tworzy commita sam.

Z terminala zamiast UI: `pnpm submit js/01-closures/easy`. Zalecana główna kolejność
frontendu to JavaScript → TypeScript → React z TypeScriptem → Next.js z TypeScriptem.

Przycisk **Następne zadanie** prowadzi kolejno przez easy → medium → hard, a po hard
otwiera easy następnego zagadnienia. Reset postępu nie modyfikuje plików rozwiązania.

## Struktura zadania

```
tracks/js/01-closures/
├─ README.md      # teoria zagadnienia
├─ easy|medium|hard/
│  ├─ task.md     # polecenie
│  ├─ starter.js  # TWÓJ plik — jedyny, który edytujesz
│  ├─ run.test.js # testy (nie podglądaj przed rozwiązaniem ;))
│  ├─ hints.md    # hinty
│  └─ _solution.js# wzorzec — UI pokazuje po zaliczeniu
```

## Dla utrzymującego

- `pnpm verify:solutions [track]` — dowód, że każdy wzorzec przechodzi swoje testy.
  Musi być zielone po każdej zmianie treści.
- `pnpm verify:solutions:java` i `pnpm verify:starters:java` — macierz Javy na JDK
  wskazanym przez `ORZI_JAVA_HOME` albo wykrytym lokalnie.
- `pnpm audit:curriculum` — kompletność wszystkich publicznych tracków i zgodność
  katalogów z kolejnością UI.
- Konwencje treści i kontrakty harnessu: [SPEC.md](SPEC.md).
- Długoterminowa roadmapa intern → mid:
  [docs/curriculum/ROADMAP.md](docs/curriculum/ROADMAP.md).
- Końcowy stan, liczniki, branche i dowody:
  [docs/curriculum/FINAL_AUDIT.md](docs/curriculum/FINAL_AUDIT.md).
- Zadania są kurowane ze sprawdzonych źródeł (javascript.info, Exercism, MDN,
  oficjalne docs) — nie wymyślane. Testy pisane pod rozwiązania wzorcowe.
- Review po module: rozwiązania zapisane komendą `pnpm commit:task` są w gicie
  (`solve:` commity) — otwórz PR z gałęzi
  i daj do przejrzenia człowiekowi albo `/code-review`.
