# Obsłuż draft, publikację i skrót klawiaturowy

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `PostEditor`. Formularz wywołuje jedną Action, a przyciski przekazują
`intent=draft` albo `intent=publish`. Oba mają jawny `type="submit"`.

`Ctrl+Enter` i `Cmd+Enter` w edytorze mają wywołać `requestSubmit()` z przyciskiem
publikacji, dzięki czemu Action otrzyma właściwy intent. W pending wyłącz oba
przyciski i pokaż `Zapisywanie…` lub `Publikowanie…` zależnie od klikniętej operacji.
