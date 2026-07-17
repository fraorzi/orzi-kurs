# async/await

`async/await` to składnia nad promisami — nie nowy mechanizm. Funkcja `async`
**zawsze zwraca promise**; `await` wstrzymuje jej wykonanie do ustalenia promisa
(nie blokując wątku — reszta programu biegnie dalej).

## Przekład then ↔ await

```js
// then:
function load() {
  return fetchUser().then((user) => fetchPosts(user.id).then((posts) => ({ user, posts })));
}

// async/await — to samo, płasko:
async function load() {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);
  return { user, posts };
}
```

`return x` w async funkcji = promise rozwiązany z `x`. `throw` = promise odrzucony.

## Obsługa błędów

```js
async function load() {
  try {
    return await fetchUser();
  } catch (err) {
    // łapie odrzucenie promisa — odpowiednik .catch()
  } finally {
    // zawsze
  }
}
```

Uwaga na subtelność: `return fetchUser()` (bez await) NIE zostanie złapane przez
lokalny try/catch — `return await fetchUser()` tak.

## Sekwencyjnie vs równolegle — najważniejsza decyzja

```js
// SEKWENCYJNIE — b czeka, aż skończy się a (suma czasów):
const a = await taskA();
const b = await taskB();

// RÓWNOLEGLE — obie startują od razu (czas najwolniejszej):
const [a, b] = await Promise.all([taskA(), taskB()]);
```

Zasada: sekwencyjnie tylko, gdy wynik jednej operacji jest potrzebny do startu drugiej.
Niezależne operacje → `Promise.all`. `await` w pętli `for` po niezależnych zadaniach
to klasyczny błąd wydajnościowy (lint ma na to regułę: `no-await-in-loop`).

## Timeout i wyścigi

```js
// przerwij oczekiwanie po ms:
Promise.race([operacja, delay(ms).then(() => { throw new Error("Timeout"); })]);

// pierwszy SUKCES (nie pierwsze ustalenie):
Promise.any([mirrorA(), mirrorB()]); // wszystkie padły → AggregateError(errors)
```

`race` vs `any`: `race` kończy przy pierwszym **ustaleniu** (także błędzie),
`any` ignoruje błędy i czeka na pierwszy **sukces**.

`race` nie zatrzymuje przegranej operacji. Do prawdziwego timeoutu przekaż jej
`AbortSignal` i po przekroczeniu czasu wywołaj `abort()`.

## Częste błędy

- `await` w `for` zamiast `Promise.all` dla niezależnych operacji,
- zgubiony `await` — dalszy kod działa na promisie zamiast na wartości,
- `forEach(async ...)` — nie czeka na nic; użyj `for..of` albo `map` + `Promise.all`,
- mieszanie `then` z `await` w jednej funkcji bez powodu.

## Kiedy używać

- Gdy sekwencja asynchroniczna ma wyglądać jak zwykły przepływ sterowania.
- W `try/catch/finally`, kiedy lokalna warstwa potrafi obsłużyć lub wzbogacić błąd.
- Z `Promise.all`, gdy niezależne operacje powinny rozpocząć się razem.

## Kiedy unikać

- Nie dodawaj `async`, jeśli funkcja tylko zwraca istniejący Promise i nie wnosi obsługi.
- Nie używaj sekwencyjnego `await` dla niezależnych operacji bez świadomego powodu.
- Nie ukrywaj błędu przez pusty `catch`; obsłuż go albo pozwól mu przejść wyżej.

## Pułapki

- Kod przed pierwszym `await` wykonuje się synchronicznie.
- Każde `await`, także gotowej wartości, oddaje dalsze wykonanie do mikrotaski.
- `return promise` i `return await promise` różnią się zachowaniem lokalnego `try/catch`.
