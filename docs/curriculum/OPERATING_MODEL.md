# Model prowadzenia curriculum

Ten dokument jest trwałą instrukcją dla długiego agentowego procesu. Historia rozmowy
nie jest źródłem prawdy — są nim pliki w tym katalogu, `tasks/curriculum.md`, testy
i historia Git.

## Cel

Uczeń zna już omawiane technologie na poziomie interna. Kurs ma doprowadzić go do
praktycznej samodzielności mida: implementowania funkcji od wymagań do wdrożenia,
diagnozowania problemów, testowania, podejmowania rozsądnych decyzji projektowych
i pracy z dokumentacją bez prowadzenia za rękę.

Nie mierzymy sukcesu liczbą lekcji. Mierzymy go zachowaniami opisanymi w
`COMPETENCY_MATRIX.md`.

## Ograniczenia wykonawcze

- Model: wyłącznie GPT-5.6 Sol, również dla subagentów. Jeśli modelu subagenta nie
  da się zagwarantować, praca pozostaje w głównym agencie.
- Jeden agent zapisujący w danym checkoutcie. Równoległa praca może być tylko
  read-only albo w odseparowanych worktree.
- Nie uruchamiaj dev servera bez wyraźnej prośby użytkownika.
- Nie nadpisuj starterów rozwiązanych przez użytkownika ani jego postępu.
- Operacje Git: osobny branch na track, logiczne commity, push po zielonej bramce.
- Nie otwieraj ani nie merguj PR-ów; użytkownik robi końcowy review i PR.

## Branche

Branch fundamentu:

- `feature/curriculum-foundation`

Branche tracków, tworzone z aktualnego fundamentu:

- `feature/curriculum-javascript`
- `feature/curriculum-typescript`
- `feature/curriculum-react`
- `feature/curriculum-node`
- `feature/curriculum-next`
- `feature/curriculum-mysql`
- `feature/curriculum-strapi`
- `feature/curriculum-java`
- `feature/curriculum-combined`

Branch jednego tracka nie powinien zawierać treści innego tracka. Wspólne rozszerzenia
harnessu trafiają do fundamentu albo do małego, jasno opisanego brancha zależnego.

## Pętla dla każdego tracka

1. Odczytaj `STATE.md`, aktualne curriculum, postęp ucznia i historię branchy.
2. Zrób audyt zakresu:
   - aktualna dokumentacja oficjalna,
   - oficjalny kurs lub uznany syllabus,
   - typowe zadania ćwiczeniowe,
   - realne obowiązki w projekcie produkcyjnym.
3. Zapisz źródła, wersje docelowe, luki i zależności.
4. Wybierz najmniejszy spójny blok, zwykle 3–6 zagadnień albo jeden moduł.
5. Dodaj teorię, startery, rozwiązania, hinty i deterministyczne testy.
6. Sprawdź:
   - rozwiązania wzorcowe przechodzą,
   - zwykłe i debugowe startery oblewają poprawność,
   - optymalizacyjne startery przechodzą poprawność, lecz oblewają jakość,
   - lint i typecheck wykrywają zamierzone problemy,
   - testy nie są zależne od sieci, kolejności ani ciasnych timingów.
7. Zrób niezależny audyt całego bloku: teoria ↔ polecenie ↔ hinty ↔ testy ↔ solution.
8. Zaktualizuj `tasks/curriculum.md`, `ROADMAP.md` i `STATE.md`.
9. Przejrzyj diff, zrób commit i push.
10. Po każdym module ponownie oceń kolejność dalszych tematów na podstawie zdobytych
    zależności i postępu ucznia.

## Hierarchia źródeł

1. Specyfikacja i dokumentacja producenta projektu.
2. Oficjalne przewodniki i kursy producenta.
3. Utrzymywane kursy akademickie oraz repozytoria ćwiczeń z jawną licencją.
4. Uznane książki i autorzy — jako źródło pedagogiki lub wariantów zadań.
5. Artykuły społeczności wyłącznie jako trop; twierdzenie techniczne musi zostać
   potwierdzone wyżej albo eksperymentem.

Przy każdym audycie zapisuj datę i wersję. Dla niepewnego zachowania uruchom minimalny
eksperyment. Nie kopiuj poleceń ani rozwiązań; kuruj koncept i twórz własny kontekst.

## Standard pojedynczego zagadnienia

README wyjaśnia model mentalny, przykłady, zastosowania, alternatywy, pułapki,
koszty i źródła. Zadania mają rosnącą samodzielność:

- easy — skupiony koncept i szybki feedback,
- medium — wariant, przypadki brzegowe i decyzja implementacyjna,
- hard — realistyczna zmiana, naprawa albo integracja kilku elementów.

Każdy większy etap kończy się modułem wieloplikowym. Moduł przypomina ticket
produkcyjny: wymagania funkcjonalne i niefunkcjonalne, zastany kod, testy,
ograniczenia, błędy i kryteria akceptacji.

## Bramka tracka

Track można uznać za gotowy dopiero, gdy:

- wszystkie rozwiązania wzorcowe przechodzą,
- każdy starter zachowuje właściwą bramkę porażki,
- kolejność ma jawne prerekwizyty,
- są zadania implementacyjne, debugowe `[D]`, optymalizacyjne `[O]` i projektowe,
- są testy zachowania, błędów i istotnych granic,
- źródła i wersje są aktualne,
- kompetencje końcowe mają pokrycie w zadaniach,
- końcowy moduł wymaga samodzielnego złożenia kilku tematów,
- końcowy review nie wykazuje sprzeczności materiału z testami.
