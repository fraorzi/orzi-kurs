# Ręczny fetch w efekcie: stany, race conditions i anulowanie

Pobieranie danych zależnych od tego, że komponent jest widoczny lub od jego propsów,
jest synchronizacją z siecią. Może więc być wykonane w efekcie:

```tsx
useEffect(() => {
  let ignore = false;

  load(query).then((data) => {
    if (!ignore) {
      setData(data);
    }
  });

  return () => {
    ignore = true;
  };
}, [load, query]);
```

Cleanup nie cofa już wysłanego żądania, ale zapobiega zapisaniu odpowiedzi należącej
do nieaktualnego renderu.

## Race condition

Kolejność odpowiedzi nie musi odpowiadać kolejności żądań. Jeśli zapytanie `react`
zakończy się po nowszym `react 19`, starsza odpowiedź nie może nadpisać aktualnego
widoku. Flaga zamknięta w konkretnym cyklu efektu jest prostą ochroną.

Każdy request potrzebuje również jawnych stanów co najmniej pending, success i error.
Zmiana klucza żądania powinna natychmiast przestać prezentować poprzedni wynik jako
wynik nowego zapytania.

## AbortController

Jeśli klient obsługuje `AbortSignal`, utwórz kontroler dla konkretnego cyklu efektu,
przekaż `controller.signal` do całego łańcucha i wywołaj `controller.abort()` w
cleanupie.

Anulowanie oszczędza zasoby, ale kod nadal powinien chronić zapis stanu po abort.
Nie każdy adapter zatrzyma się natychmiast, a praca przetwarzająca odpowiedź może
wykonać się po zakończeniu samego fetch.

## Dlaczego to mechanizm niskopoziomowy

Ręczny fetch w efekcie nie zapewnia automatycznie:

- cache i deduplikacji,
- danych w HTML serwerowym,
- unikania waterfalli między komponentami,
- prefetchingu i natychmiastowego powrotu do poprzedniego ekranu,
- współdzielenia retry, invalidacji i stanu serwerowego.

W aplikacji frameworkowej preferuj jej mechanizm danych. Po stronie klienta rozważ
dedykowaną bibliotekę server state. Ręczny efekt pozostaje ważny do rozumienia
integracji i kodu niskopoziomowego.

## Kiedy używać

- Używaj ręcznego efektu dla małej integracji bez dostępnej warstwy danych.
- Modeluj pending/success/error i chroń każdy zapis przed nieaktualnym requestem.
- Propaguj `AbortSignal` przez wszystkie warstwy klienta, które potrafią anulować pracę.

## Kiedy unikać

- Nie buduj osobnego cache w każdym komponencie.
- Nie pobieraj w efekcie, jeśli framework może dostarczyć dane przed renderem.
- Nie zakładaj, że samo `abort()` rozwiązuje każdą race condition.

## Pułapki

- Spóźniona odpowiedź może nadpisać nowszy sukces lub błąd.
- Brak obsługi rejection prowadzi do nieobsłużonej obietnicy i UI bez stanu błędu.
- Jeden `AbortSignal` jest jednorazowy; nowy request potrzebuje nowego kontrolera.
- Pokazanie starego rekordu pod nowym ID jest gorsze niż jawny stan pending.

## Źródła

- <https://react.dev/reference/react/useEffect#fetching-data-with-effects>
- <https://react.dev/learn/you-might-not-need-an-effect#fetching-data>
- <https://react.dev/learn/removing-effect-dependencies>
- <https://developer.mozilla.org/en-US/docs/Web/API/AbortController>
- <https://dom.spec.whatwg.org/#interface-abortcontroller>
