## Hint 1

Nie renderuj edytora warunkowo. Otocz go przez `<Activity>` i przełączaj prop
`mode` między `"visible"` i `"hidden"`.

## Hint 2

Subskrypcję uruchom w `useEffect` wewnątrz panelu edycji i bezpośrednio zwróć
cleanup otrzymany z `subscribe`.

## Hint 3

Stan aktywnej zakładki należy do `WorkspaceTabs`, ale tekst draftu może pozostać
lokalnym stanem stale zamontowanego `Editor`.

