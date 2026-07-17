# DOM, formularze i zdarzenia

DOM API ma szerokie typy, bo jedno zdarzenie może pochodzić z wielu elementów.
Bezpieczny kod zawęża `EventTarget`, rozróżnia `target` i `currentTarget` oraz nie
zakłada, że dane formularza są poprawne.

## `target` i `currentTarget`

- `target` — najgłębszy element, który rozpoczął zdarzenie,
- `currentTarget` — element, na którym aktualnie działa listener.

Oba mają typ `EventTarget | null`. Przed odczytem `.value`, `.dataset` albo `closest`
potrzebny jest `instanceof`.

## Formularze

`FormData` zwraca `FormDataEntryValue | null`, czyli `string | File | null`.
Pole tekstowe wymaga sprawdzenia `typeof value === "string"`. Checkbox bez zaznaczenia
zwykle nie występuje w FormData.

## Delegacja zdarzeń

Listener na kontenerze może obsłużyć wiele przycisków:

```ts
const actionElement = target.closest<HTMLElement>("[data-action]");
```

Nadal trzeba sprawdzić, czy znaleziony element należy do bieżącego kontenera i czy
wartość `dataset` jest dozwolonym literałem.

## Kiedy używać

- formularzy bez frameworka i adapterów UI,
- delegacji kliknięć w dynamicznych listach,
- helperów współdzielonych przez komponenty.

## Kiedy unikać

- `event.target as HTMLInputElement`,
- odczytu dataset bez walidacji unii wartości,
- traktowania `FormData.get()` jak zawsze obecnego stringa.

## Pułapki

- `currentTarget` wraca do `null` po zakończeniu dispatchu,
- kliknięty może być `span` wewnątrz przycisku,
- `disabled` element nie powinien uruchamiać akcji,
- typ DOM nie waliduje długości hasła ani formatu danych.

Źródła: MDN Event, EventTarget, FormData, Element.closest i HTMLElement.dataset.
