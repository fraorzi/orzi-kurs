# Dostępne formularze z Server Actions

Formularz może wywołać Server Action bez ręcznego endpointu. Action otrzymuje
`FormData`, ale nadal jest publiczną granicą serwera: musi ponownie sprawdzić sesję,
authorization i cały payload. Atrybuty HTML (`required`, `type`) poprawiają UX,
lecz nie zastępują walidacji serwerowej.

`useActionState` łączy wynik Action z formularzem i udostępnia pending. Błędy pól
powinny mieć stabilne ID, być połączone przez `aria-describedby`, ustawiać
`aria-invalid` i pojawiać się w live regionie. Użytkownik nie może tracić wpisanych
danych po błędzie serwera.

Przy kilku operacjach przyciski mogą przekazać `name`/`value` submittera albo własny
`formAction`. `useFormStatus` działa tylko w potomku danego formularza. Skróty
klawiaturowe powinny używać `requestSubmit()`, bo zachowuje walidację i semantykę
submittera — `form.submit()` je omija.

## Kiedy używać

- Mutacje z progressive enhancement i wynikiem walidacji w tym samym widoku.
- `useActionState` dla błędów, success message i pending zależnych od Action.
- `useFormStatus` w wielokrotnie używanym przycisku potomnym formularza.
- `requestSubmit(button)` dla dostępnego skrótu konkretnej operacji.

## Kiedy unikać

- Ukrytego pola jako ochrony ID zasobu — klient może je zmienić.
- Jednego ogólnego komunikatu bez wskazania błędnych pól.
- Wyłączania całego ekranu dla lokalnej mutacji.
- Czyszczenia formularza po błędzie walidacji.

## Pułapki

- Zła sygnatura Action po dodaniu `useActionState`: pierwszy argument to stan.
- Walidacja tylko w przeglądarce.
- `useFormStatus` w komponencie renderującym sam `<form>`, a nie pod nim.
- Pending bez komunikatu tekstowego albo zmiana etykiety powodująca utratę kontekstu.
- Programowe `submit()` omijające constraint validation i submitter.

## Źródła

- <https://nextjs.org/docs/app/guides/forms>
- <https://react.dev/reference/react/useActionState>
- <https://react.dev/reference/react-dom/hooks/useFormStatus>
- <https://www.w3.org/WAI/tutorials/forms/notifications/>
