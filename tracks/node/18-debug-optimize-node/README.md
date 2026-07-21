# [O] Debugowanie i optymalizacja pod pomiarem

Zadania `[O]` mają inną bramkę niż reszta: **starter działa poprawnie** —
oblewa wyłącznie testy jakości oznaczone `[quality]`, które mierzą pracę
deterministycznie (liczniki operacji, szczyt współbieżności, liczba
listenerów), nigdy czasem zegarowym. To odpowiada realnej pracy: kod
przechodzi review funkcjonalne, a mimo to zjada CPU, dławi pulę połączeń
albo cieknie pamięcią.

Trzy klasy problemów w tym temacie:

**Złożoność ukryta w wygodnym API.** `array.some/find` wewnątrz pętli po tej
samej kolekcji to O(n²), które w testach na 20 elementach jest niewidzialne.
Diagnoza: policz operacje, nie sekundy. Naprawa: struktura o właściwym
koszcie (`Set`/`Map` — O(1) lookup).

**Współbieżność bez limitu.** `Promise.all(items.map(run))` startuje
wszystko naraz — dla 10 000 jobów to 10 000 otwartych połączeń. Wzorzec
bounded concurrency: pula `limit` workerów zdejmujących z kolejki wspólny
indeks; wyniki wracają na swoje pozycje, kolejność wyników jest zachowana
mimo przeplotu wykonania.

**Wycieki listenerów.** Subskrypcja per klient bez sprzątania starej to
rosnąca lista handlerów — pamięć + podwójne dostawy zdarzeń. Kontrakt:
re-subskrypcja klienta **zastępuje** poprzedni listener, cleanup zdejmuje
dokładnie swój.

## Kiedy używać tych technik

- Gdy profil albo metryki (event loop delay, RSS, liczba listenerów) pokazują
  problem — optymalizacja zaczyna się od pomiaru, nie od przeczucia.
- Przy code review kodu z pętlami po kolekcjach, `Promise.all` na wejściu
  o nieograniczonym rozmiarze i subskrypcjami bez cleanupu.

## Jak podchodzić do zadań [O]

1. Przeczytaj starter — on definiuje kontrakt funkcjonalny, który musi
   zostać zachowany.
2. Uruchom testy: zielona poprawność, czerwone `[quality]` mówi ci **co**
   jest mierzone.
3. Zmień strukturę/algorytm, nie mikrooptymalizacje — bramki mierzą rząd
   wielkości, nie procenty.

## Pułapki

- Optymalizacja bez zachowania semantyki (kolejność wyników, first-wins
  przy duplikatach) to regresja, nie ulepszenie — testy poprawności dalej
  obowiązują.
- Bounded concurrency przez `chunk + Promise.all` per partia jest lepsze
  niż nic, ale nie utrzymuje stałego poziomu `limit` (ostatnie zadanie
  partii blokuje start następnej) — pula ze wspólnym indeksem tak.
- Przy zastępowaniu listenera zdejmij **starą referencję** — mapa
  `clientId → listener` jest stanem, który trzeba utrzymywać.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [Events](https://nodejs.org/download/release/latest-v24.x/docs/api/events.html)
- [MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
