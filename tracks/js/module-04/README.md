# Moduł 04 — Mini state manager z undo/redo

Czwarty **projekt wieloplikowy**. Rozszerzasz pomysł ze store'a (moduł 01) o pamięć
historii: każda zmiana stanu zostaje zapisana, więc możesz cofać i ponawiać jak
w edytorze. Sekret jest w tym, że dzięki **niemutowalności** undo nie „odwraca"
niczego — po prostu wskazuje na wcześniejszy, wciąż nietknięty obiekt stanu.

To synteza trzech zagadnień: **niemutowalne aktualizacje** (23), **pub/sub** (24)
oraz **gettery / property accessors** (22).

## Architektura

```
src/
├─ history.js  # createHistory(initial) — stosy past/present/future
├─ store.js    # createStore — pub/sub + niemutowalny zapis, oparty na historii
└─ index.js    # publiczne API (re-eksport)
```

`store.js` buduje na `history.js` — sam nie wie nic o stosach, tylko woła `push`/
`undo`/`redo`. Rozdział jest celowy: logikę „jak działa cofanie" testujesz w izolacji,
a store dokłada do niej obserwowalność.

## Kluczowe idee

- **Undo/redo = trzy stosy.** `past` to przeszłość, `future` to cofnięte kroki,
  między nimi wędruje `present`. `push` (nowa zmiana) czyści `future` — dokładnie tak,
  jak w edytorze nowy ruch po cofnięciu wymazuje „przyszłość".
- **Niemutowalność czyni cofanie darmowym.** Skoro `set` nigdy nie modyfikuje starego
  obiektu, tylko tworzy nowy, historia to lista referencji do niezmiennych migawek.
  Cofnięcie to podmiana wskaźnika — zero kopiowania w tył, zero ryzyka, że stary stan
  „przecieknie" zmodyfikowany.
- **Store = historia + obserwator.** Pub/sub (`Set` słuchaczy) powiadamia UI po każdej
  zmianie, undo/redo włącznie. `canUndo`/`canRedo` jako gettery dają widokowi żywy stan
  przycisków bez ręcznego przeliczania.

## Kiedy używać / czego unikać

- **Używaj** migawek całego stanu do undo, gdy stan jest mały (formularz, ustawienia,
  edytor tekstu). To najprostszy, najpewniejszy model.
- **Nie trzymaj** nieograniczonej historii dla dużych stanów — każda migawka to
  referencja do pełnego obiektu; przy ciężkim stanie ogranicz głębokość albo przejdź
  na patche/diffy (command pattern) zamiast pełnych snapshotów.
- **Nie mutuj** obiektów w historii po fakcie — to jedyny sposób, żeby zepsuć ten model.
  Cała gwarancja stoi na tym, że migawki są niezmienne.
