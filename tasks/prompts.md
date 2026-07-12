# Gotowe prompty do sesji

## Jak używać

- **Kiedy:** po zamknięciu MVP (pierwszy commit repo). Wcześniej nie — sesje opierają
  się na SPEC/curriculum/wzorcu js/01-05, które muszą być scommitowane.
- **Jak:** nowe okno Claude Code w katalogu `orzi-kurs`, wklej prompt.
  Jedna sesja = jeden moduł. **Nie odpalaj dwóch sesji treści naraz** (konflikt na
  harness/package.json przy rozszerzeniach).
- **Modele (oszczędność usage):** Prompt 1 (treść) → **Opus** — wystarcza, bo jakość
  trzymają bramki (kuracja ze źródeł, wzorzec js/08-12, verify:solutions, wytyczne
  testów niżej). Prompt 2 (audyt) → **Fable** — mocny model czyta i poprawia, co jest
  wielokrotnie tańsze niż generowanie. Prompty 3-4 → Opus/Sonnet.
- **Cykl na moduł:** Prompt 1 (treść) → Prompt 2 (audyt, świeże okno) → Ty rozwiązujesz
  → Prompt 3 (review Twoich rozwiązań). Prompt 4 (powiadomienia) — raz, na sam koniec.
- **Kolejność modułów:** js (dokończenie) → ts → react → node → next → mysql → strapi
  → combined. Prompt 1 sam bierze pierwszy nieukończony.
- **Tempo:** wystarczy być 1 moduł przed Twoim planem nauki; możesz też wygenerować
  wszystko z góry — każda sesja jest niezależna.

---

## Prompt 1 — moduł treści (uniwersalny, wklejasz do każdej sesji)

```
Dokończ kolejny moduł treści w orzi-kurs.

1. Przeczytaj SPEC.md, tasks/curriculum.md i tabelę „Wymagania harnessu per moduł"
   w tasks/prompts.md. Wzorzec jakości i konwencji: tracks/js/01-closures
   i tracks/js/05-event-loop (całe katalogi).
2. Wybierz pierwszy moduł z nieodhaczonymi pozycjami wg kolejności:
   js → ts → react → node → next → mysql → strapi → combined
   (chyba że w następnej wiadomości wskażę inny).
3. AUDYT ZAKRESU zanim napiszesz cokolwiek: porównaj pozycje modułu ze źródłami.
   Baza źródeł (nie zamknięta lista): javascript.info, MDN, Eloquent JavaScript,
   You Don't Know JS, Exercism, JavaScript30, oficjalne docs Node.js,
   TypeScript Handbook (typescriptlang.org), Total TypeScript (darmowe tutoriale),
   type-challenges, react.dev (rozdziały mają Challenges z rozwiązaniami),
   patterns.dev, Testing Library docs, Full Stack Open, oficjalne docs i Learn
   Next.js, oficjalne docs Strapi, oficjalne docs MySQL, SQLBolt, SQLZoo.
   MOŻESZ i POWINIENEŚ korzystać też z innych źródeł znalezionych samodzielnie
   (WebSearch), o ile są wiarygodne: oficjalna dokumentacja, uznane książki
   i autorzy, materiały o weryfikowalnej poprawności. Priorytetem jest DUŻA
   OBJĘTOŚĆ zadań i różnorodność implementacji, trudności i zastosowań — nie
   przywiązanie do konkretnej listy. Każdy temat mający wiele wariantów ROZBIJ
   na osobne zagadnienia i DOPISZ do curriculum.md. Curriculum to minimum,
   nie limit. Wypisz mi wynik audytu (co rozbiłeś i dlaczego) zanim ruszysz.
4. Jeśli moduł wymaga rozszerzenia harnessu (tabela niżej) — najpierw zleć je
   subagentowi przez Agent tool z model: "opus", ze szczegółowym specem i obowiązkową
   weryfikacją na tracks/_smoke. Treść piszesz dopiero na działającym harnessie.
5. Treść wg SPEC.md: README z sekcjami „kiedy używać / kiedy unikać / pułapki";
   poziomy easy (niemal z README) / medium (wariacja) / hard (wymaga zrozumienia,
   może być wieloplikowy); hinty progresywne; _solution; testy z polskimi opisowymi
   nazwami i custom komunikatami asercji tłumaczącymi przyczynę; benchmarki
   (@harness/bench) wszędzie tam, gdzie temat ma wymiar wydajnościowy.
   Zadania WYŁĄCZNIE kurowane ze sprawdzonych źródeł — nigdy wymyślone od zera.
   Zagadnienia [D] = debug: starter to kompletny ZEPSUTY kod, uczeń go naprawia.
   Zagadnienia [O] = optymalizacja: starter to kompletny kod, który DZIAŁA POPRAWNIE,
   ale jest nieoptymalny (zła złożoność, powtórzona praca, zła struktura danych, zbędne
   kopie, brak memoizacji) — uczeń go przepisuje bez zmiany kontraktu. Chcę OBU typów,
   nie tylko debugowania: optymalizacja działającego kodu to codzienna robota.
   Definicje i bramki: SPEC.md → „Typy zagadnień".
6. Bramka jakości: pnpm verify:solutions <moduł> musi być 100% green. Sprawdź też,
   że każdy starter w stanie wyjściowym OBLEWA testy (zadanie nie może być
   „zaliczone od urodzenia"):
   - zwykłe i [D]: starter oblewa testy poprawności;
   - [O]: starter PRZECHODZI testy poprawności i OBLEWA test wydajności.
   Uwaga na expectScaling: mierzy najpierw mały rozmiar (JIT na zimno), więc zaniża
   ratio — zbyt małe `sizes` nie złapią O(n²). Dla tanich operacji użyj [2000, 20000]
   i sprawdź oba kierunki na kilku przebiegach.
7. Odhacz zrobione pozycje w tasks/curriculum.md.
8. ŻADNYCH commitów git i żadnych propozycji commitów — commituję sam.
9. Raport: co powstało, co dopisałeś do curriculum, wyniki verify, ograniczenia.
```

## Prompt 2 — audyt tracka (świeże okno PO Prompcie 1, PRZED Twoją nauką)

```
Jesteś audytorem treści edukacyjnej w orzi-kurs. Zweryfikuj kompletnie moduł <NAZWA>
(tracks/<NAZWA>). Nie ufaj niczemu — sprawdzaj. Przeczytaj SPEC.md i tasks/curriculum.md.

A. POPRAWNOŚĆ MERYTORYCZNA
   - Przeczytaj każde README, task.md, hints.md, testy i _solution w module.
   - Każde twierdzenie teoretyczne z README zweryfikuj z najbardziej wiarygodnymi
     źródłami (oficjalna dokumentacja, specyfikacja ECMAScript/MDN, docs frameworka).
     Użyj WebSearch/WebFetch.
   - Jeśli nie masz PEWNOŚCI, jak coś się zachowuje — nie zgaduj: napisz minimalny
     kod testowy w katalogu scratchpad (poza repo), uruchom/skompiluj go i sprawdź
     zachowanie under the hood (node, tsc, przeglądarka przez preview). Dopiero
     wynik eksperymentu traktuj jako prawdę.
   - Zweryfikuj spójność: czy testy sprawdzają to, co obiecuje task.md; czy hinty
     nie przeczą testom; czy komunikaty asercji mówią prawdę; czy progi benchmarków
     są sensowne (nie flaky).

B. AKTUALNOŚĆ
   - Sprawdź, czy treść pokrywa i poprawnie opisuje AKTUALNE wersje: React 19,
     Next 16, bieżące TS/Node/Strapi/MySQL. Żadnych przestarzałych API i wzorców
     (np. legacy context, stare lifecycle, wycofane flagi) poza miejscami, gdzie
     celowo uczymy różnicy stare-vs-nowe.
   - Nowe istotne rzeczy z tych wersji, których brakuje w module → dopisz propozycje
     do curriculum.md.

C. KOMPLETNOŚĆ I GŁĘBIA
   - Oceń, czy zagadnienia wyczerpują temat na poziom mid: warianty implementacji,
     przypadki użycia, pułapki, „kiedy unikać". Porównaj zakres modułu z tym, co
     oferują najlepsze źródła (javascript.info, oficjalne docs, react.dev,
     TypeScript Handbook, patterns.dev i inne wiarygodne, które znajdziesz).
   - Każde zagadnienie, które da się istotnie rozbudować (więcej implementacji,
     szersze podejście), wypisz z konkretną propozycją i dopisz do curriculum.md
     jako nowe pozycje [ ] z dopiskiem „(audyt)".

D. MECHANIKA
   - pnpm verify:solutions <NAZWA> → musi być 100% green.
   - Sprawdź też pokrycie typów zagadnień: czy moduł ma zarówno [D] (debug), jak i [O]
     (optymalizacja działającego kodu)? Jeśli brakuje [O] — dopisz propozycje do
     curriculum.md z dopiskiem „(audyt)".
   - Każdy starter w stanie wyjściowym musi OBLEWAĆ swoje testy — sprawdź to
     (wyjątek: w zagadnieniach [O] starter ma PRZECHODZIĆ testy poprawności i oblewać
     wyłącznie test wydajności)
     (pnpm submit na próbce lub vitest bezpośrednio; NIE nadpisuj progress.json:
     jeśli coś w nim zmienisz, przywróć na koniec).

E. WYNIK
   - Błędy merytoryczne i mechaniczne POPRAW od razu w plikach (po poprawce
     verify:solutions znowu green).
   - Braki zakresu → curriculum.md z dopiskiem „(audyt)".
   - ŻADNYCH commitów git i żadnych propozycji commitów — commituję sam.
   - Raport końcowy: co sprawdzone, co poprawione (plik po pliku), co dopisane
     do curriculum, co przetestowałeś eksperymentalnie w scratchpadzie i z jakim
     wynikiem, czego nie dało się zweryfikować i dlaczego.
```

## Prompt 3 — review po rozwiązaniu modułu (wklejasz, gdy skończysz zadania)

```
Skończyłem rozwiązywać moduł <NAZWA> w orzi-kurs. Zrób gałąź review/<NAZWA>
zawierającą moje solve-commity, wypchnij (remote origin jest skonfigurowany),
otwórz PR "Moduł <NAZWA> — review" i uruchom /code-review na tej gałęzi.
Interesuje mnie jakość, nie poprawność (testy przeszły): nazewnictwo, czytelność,
idiomatyczność, prostota. Niczego nie merguj i nie poprawiaj za mnie — chcę
listę uwag do samodzielnej poprawki.
```

(Wymaga jednorazowo: repo na GitHubie jako prywatne + `git remote add origin ...`.)

## Prompt 4 — powiadomienia na iPhone (raz, na sam koniec)

```
Skonfiguruj powiadomienia dla orzi-kurs: GitHub Action z cronem na 09:00 i 17:00 UTC
(11:00/19:00 PL latem), który czyta progress.json i tasks/curriculum.md i wysyła
push przez ntfy.sh na temat o wylosowanej sekretnej nazwie: aktualna passa dni,
liczba zaliczonych zadań i następne zadanie do zrobienia. Na końcu podaj mi
instrukcję krok po kroku, co zainstalować i skonfigurować na iPhonie.
```

---

## Wytyczne projektowania testów (obowiązkowe dla Promptu 1)

- Jeden test = jedno wymaganie; nazwa po polsku opisuje wymaganie („zwraca nową
  tablicę zamiast mutować wejście"), custom komunikat asercji tłumaczy PRZYCZYNĘ
  i kierunek naprawy. Wzorzec: tracks/js/10-promises i 12-event-loop.
- Determinizm: zero sieci i losowości; timery krótkie (≤80ms) z tolerancją
  (elapsed ≥ ms-5, nie ==); asercje czasowe tylko z szerokim marginesem.
- Współbieżność: instrumentuj licznikami w domknięciu (active/maxActive), nie
  czasami; kolejność sprawdzaj tablicą zdarzeń (push etykiet), nie sleep-ami.
- Event loop: asercje fazowe — stan po sync, po `await Promise.resolve()`,
  po `setTimeout(0)` osobno.
- Zadania składniowe („przepisz na X", „nie używaj Y"): dodatkowo test źródła
  (readFileSync startera + regex) z komunikatem, czemu ograniczenie istnieje.
- Wydajność wyłącznie przez `expectScaling` z `@harness/bench` (progi luźne — klasy
  złożoności, nie mikro-optymalizacje). Żadnych własnych benchmarków ad hoc.
- Zakazy: snapshot testy, testowanie szczegółów implementacji zamiast kontraktu,
  zależność testów od siebie, asercje bez komunikatu w miejscach nieoczywistych.
- Po napisaniu wzorca: uruchom testy przeciw _solution (verify) ORAZ przeciw
  starterowi (musi oblewać) — oba wyniki wklej do raportu.

## Wymagania harnessu per moduł (dla Promptu 1, krok 4)

| Moduł | Rozszerzenie wymagane przed treścią |
|---|---|
| js (dokończenie) | Przy module-01: obsługa zadań wieloplikowych (`src/` + `_solution/` w runner/verify/lint) wg SPEC |
| ts | Krok typecheck w pipeline (`tsc --noEmit` na starterze zadania); zadania `.ts`; dla zadań w stylu type-challenges asercje typów (`@type-challenges/utils` lub expect-type) |
| react | Vitest environment jsdom dla tracka, @testing-library/react + user-event, helper licznika renderów na Profiler API w `@harness`, eslint-plugin-react-hooks na starterach |
| node | Brak — obecny runner wystarcza |
| next | Testy route handlers i server actions w node env; pełne e2e (Playwright) — decyzja odroczona, nie blokuje |
| mysql | Nowy adapter runnera: docker compose z MySQL, seed per zadanie, wykonanie SQL ucznia i porównanie result setu z wzorcem; EXPLAIN-asercje dla zadań indeksowych |
| strapi | Adapter: boot testowej instancji Strapi (sqlite), testy przez HTTP na API; wolny start — cache instancji między zadaniami |
| combined | Zwykle gotowe po ts+react/next+strapi; sprawdź tabelę wyżej dla pary |
