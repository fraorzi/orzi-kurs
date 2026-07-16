# useRef, callback refs i useId

Ref przechowuje wartość, która nie jest potrzebna do renderowania. Obiekt zwrócony
przez `useRef` zachowuje identity między renderami, a zmiana `ref.current` nie
uruchamia kolejnego renderu:

```tsx
const inputRef = useRef<HTMLInputElement>(null);

function focusInput() {
  inputRef.current?.focus();
}

return <input ref={inputRef} />;
```

To właściwe narzędzie dla uchwytu DOM, identyfikatora timera lub instancji biblioteki
zewnętrznej. Dane wpływające na JSX nadal należą do stanu.

## Lokalna referencja zamiast wyszukiwania dokumentu

`document.querySelector` nie zna granicy instancji komponentu. Gdy ten sam komponent
występuje kilka razy, globalny selektor może znaleźć element należący do innej
instancji. Ref przekazany do konkretnego elementu zachowuje lokalny kontrakt.

Nie czytaj ani nie zapisuj `ref.current` podczas renderu, poza przewidywalną
inicjalizacją. Render powinien pozostać czysty.

## Callback refs i cleanup w React 19

Zamiast obiektu ref można przekazać funkcję:

```tsx
<div
  ref={(node) => {
    if (!node) return;
    const detach = registry.attach(node);
    return detach;
  }}
/>
```

React 19 pozwala callbackowi ref zwrócić cleanup. React wywoła go przy odpięciu refa.
To wygodne dla observerów, masek inputa, map węzłów i bibliotek wymagających jawnego
unregister.

Zmiana identity funkcji ref także powoduje cleanup i ponowne podpięcie. Nie wykonuj
w callbacku kosztownej pracy bez zrozumienia tego cyklu.

## useId i relacje dostępności

`useId` tworzy ID stabilne dla danej instancji i zgodne z renderowaniem serwerowym:

```tsx
const id = useId();

<label htmlFor={`${id}-field`}>Klucz API</label>
<input id={`${id}-field`} aria-describedby={`${id}-hint`} />
<p id={`${id}-hint`}>Nie udostępniaj klucza.</p>
```

Jedno wywołanie może być prefiksem kilku powiązanych elementów. `useId` nie służy
do generowania key listy — key powinien pochodzić z danych.

## Kiedy używać

- Używaj refa do imperatywnej operacji na konkretnym elemencie DOM.
- Zwracaj cleanup z callback refa przy rejestracji w systemie zewnętrznym.
- Używaj `useId` do `htmlFor`, `aria-describedby` i podobnych relacji.

## Kiedy unikać

- Nie przechowuj w refie danych, których zmiana powinna odświeżyć UI.
- Nie manipuluj DOM ręcznie, jeśli ten sam rezultat można opisać przez JSX i stan.
- Nie używaj globalnego licznika ani `Math.random()` do ID hydratowanego UI.

## Pułapki

- Zmiana `ref.current` nie renderuje komponentu.
- Ref custom komponentu wymaga, aby komponent świadomie przekazał go dalej jako prop.
- Inline callback ref jest nową funkcją przy każdym renderze i może zostać przepięty.
- Duplikaty twardo zakodowanych ID łączą etykiety i opisy z niewłaściwym polem.

## Źródła

- <https://react.dev/reference/react/useRef>
- <https://react.dev/learn/referencing-values-with-refs>
- <https://react.dev/learn/manipulating-the-dom-with-refs>
- <https://react.dev/reference/react/useId>
- <https://react.dev/reference/react-dom/components/common#ref-callback>
