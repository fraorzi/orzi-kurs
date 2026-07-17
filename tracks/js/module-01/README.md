# Moduł 01 — Store z eventami

Pierwszy **projekt wieloplikowy**. Zamiast jednego pliku `starter.js` edytujesz cały
katalog `src/` — pliki importują się nawzajem, tak jak w prawdziwym module. Testy
importują publiczne API z `src/index.js`.

To synteza wcześniejszych zagadnień: **domknięcia** (prywatny stan), **Map/Set**
(rejestr słuchaczy), **niemutowalność** (nowy obiekt stanu przy każdej zmianie) i
**wzorzec pub/sub** (emitter zdarzeń). Buduje mały store w stylu obserwowalnym —
fundament tego, jak działają Redux, Zustand czy sygnały.

## Architektura

```
src/
├─ events.js   # createEmitter(): on / off / emit — czysty pub/sub
├─ store.js    # createStore(initial): stan + powiadomienia (używa emittera)
└─ index.js    # publiczne API modułu (re-eksport)
```

Zależność jest jednokierunkowa: `store.js` importuje `events.js`. `index.js` skleja
oba w API modułu. Taka warstwowość — najpierw mały, niezależny kawałek (emitter),
potem zbudowana na nim wyższa abstrakcja (store) — to typowy układ realnego kodu.

## Kluczowe idee

- **Prywatny stan przez domknięcie.** `state` żyje w ciele `createStore` i nie jest
  dostępny z zewnątrz inaczej niż przez zwrócone metody. Żadnego `this`, żadnego pola
  publicznego do przypadkowej mutacji.
- **Niemutowalne aktualizacje.** `set`/`update` nie zmieniają istniejącego obiektu —
  tworzą nowy (`{ ...state, [key]: value }`). Dzięki temu porównanie referencji
  (`prev !== next`) wystarcza, by wykryć zmianę; ta własność wspiera też płytkie
  porównywanie propsów i selektorów w bibliotekach UI.
- **Powiadomienia przez emitter.** Store nie prowadzi własnej listy subskrybentów —
  deleguje to do `createEmitter`. Jeden mechanizm pub/sub, użyty ponownie.

## Kiedy używać

- Do małego stanu współdzielonego poza konkretnym komponentem lub requestem.
- Gdy konsumenci potrzebują subskrypcji i jawnego `unsubscribe`.
- Jako granicy domenowej, jeśli publiczne API `get/set/update/subscribe` jest stabilniejsze
  niż bezpośredni dostęp do obiektu.

## Kiedy unikać

- Dla lokalnej wartości używanej w jednym miejscu zwykła zmienna jest prostsza.
- Nie buduj własnego store'a produkcyjnego, gdy gotowa biblioteka rozwiązuje już
  synchronizację, narzędzia developerskie i integrację z UI.
- Pub/sub nie zastępuje trwałości danych, transakcji ani autoryzacji.

## Pułapki

- Brak `unsubscribe` powoduje wielokrotne wywołania i utrzymywanie domknięć w pamięci.
- Mutacja obiektu stanu poza store'em omija powiadomienia i łamie kontrakt.
- Listener może wywołać kolejną aktualizację; określ semantykę reentrancy i kolejności.
- Re-eksportuj publiczne API z `index.js`, nie zmuszaj konsumenta do importów z wnętrza.
