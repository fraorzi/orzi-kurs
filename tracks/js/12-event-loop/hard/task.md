# Hard — serializacja wywołań

## `serialize(fn)`

Dekorator, który wymusza wykonywanie async funkcji **jedna operacja naraz**, w kolejności
zgłoszeń (FIFO) — nawet jeśli wywołania przychodzą gęściej, niż fn nadąża:

- kolejne wywołanie `fn` startuje dopiero, gdy poprzednie się **zakończy**
  (sukcesem lub błędem),
- każdy wywołujący dostaje promise z wynikiem **swojego** wywołania,
- odrzucenie jednego wywołania trafia do jego wywołującego, ale **nie zrywa kolejki** —
  następne wywołania normalnie się wykonują.

```js
const save = serialize(async (data) => writeToFile(data));

// trzy wywołania „naraz" — wykonają się jedno po drugim, w tej kolejności:
save("a");
save("b");
const result = await save("c"); // czeka aż a i b skończą, potem wykonuje c
```

Zastosowania: zapis do pliku/IndexedDB (współbieżny zapis = korupcja danych),
kolejkowanie mutacji do API, animacje po kolei.

To zadanie łączy wszystko z tego modułu: domknięcia (stan kolejki), promisy
(łańcuch jako kolejka) i event loop (kolejność wykonania).
