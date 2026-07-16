# Portale i granice błędów

`createPortal(children, container)` zmienia fizyczne miejsce elementów w DOM, ale
nie ich pozycję w drzewie React. Zawartość portalu nadal:

- czyta context od Reactowych rodziców,
- propaguje zdarzenia według drzewa React,
- podlega tym samym Error Boundaries.

To odróżnia portal od tworzenia osobnego roota przez `createRoot`.

## Portale w praktyce

Portale służą m.in. do toastów, tooltipów i modali, które muszą wyjść poza
`overflow`, stacking context lub strukturę layoutu rodzica. Docelowy element DOM
musi już istnieć.

Zdarzenie kliknięcia wewnątrz portalu może dotrzeć do Reactowego rodzica, nawet
jeśli w DOM element znajduje się w zupełnie innej gałęzi. Jeśli modal nie powinien
zamykać się po kliknięciu zawartości, zatrzymaj propagację na właściwej granicy.

## Granularność Error Boundaries

Error Boundary chroni część drzewa przed błędem renderowania potomka. Granicę
umieszczaj tam, gdzie istnieje sensowny niezależny fallback:

- pojedynczy widget dashboardu,
- panel rozmowy,
- sekcja ustawień,
- cała trasa jako ostatnia ochrona.

Jedna granica wokół całego dashboardu sprawia, że awaria jednego widgetu ukrywa
wszystkie pozostałe. Granica może również potrzebować resetu po zmianie zasobu,
wersji lub klucza naprawionego fragmentu.

## Kiedy używać

- Portal, gdy fizyczne miejsce DOM przeszkadza w poprawnym layeringu UI.
- Error Boundary, gdy fragment może zawieść niezależnie od reszty ekranu.
- Reset key, gdy retry lub nowa wersja danych powinna ponownie zamontować zawartość.

## Kiedy unikać

- Nie twórz osobnego React roota dla zwykłego modala.
- Nie otaczaj każdego małego elementu osobną granicą bez sensownego fallbacku.
- Error Boundary nie zastępuje walidacji ani obsługi przewidywalnych błędów domeny.

## Pułapki

- Portal nie zatrzymuje automatycznie propagacji zdarzeń.
- Zmiana docelowego `container` odtwarza zawartość portalu.
- Error Boundary nie łapie błędów zwykłych event handlerów ani własnego renderu.
- Brak resetu pozostawia naprawiony widget w starym fallbacku.

## Źródła

- <https://react.dev/reference/react-dom/createPortal>
- <https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary>
- <https://react.dev/reference/react-dom/client/createRoot>
