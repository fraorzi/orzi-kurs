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
  (`prev !== next`) wystarcza, by wykryć zmianę — dokładnie tak działa `React.memo`.
- **Powiadomienia przez emitter.** Store nie prowadzi własnej listy subskrybentów —
  deleguje to do `createEmitter`. Jeden mechanizm pub/sub, użyty ponownie.
