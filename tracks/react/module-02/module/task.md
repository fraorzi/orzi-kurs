# Panel obsługi incydentów

Dokończ wieloplikowy `SupportDesk` w katalogu `src/`.

## Kontrakt

### Początkowe dane i Suspense

`SupportDesk` otrzymuje stabilną `initialIncidentsPromise`. Odczytaj ją przez `use`
w komponencie potomnym granicy Suspense. Podczas oczekiwania pokaż status
`Ładowanie incydentów…`.

### Store

`createIncidentStore(initialIncidents)` przechowuje snapshot listy poza Reactem.

- `getSnapshot` i `getServerSnapshot` zwracają tę samą referencję bez zmiany danych.
- `addIncident` dodaje nowy incydent na początku, zachowuje poprzednie elementy,
  tworzy nowy snapshot i powiadamia listenerów.
- `subscribe` zwraca cleanup.

### Draft

`usePersistentDraft` przy pierwszym renderze odczytuje `storage.getItem(key)` i
używa wyniku albo wartości początkowej. Każda zmiana jest zapisywana do storage.

### Formularz

`NewIncidentForm` używa `useActionState` i funkcyjnego `form action`.

- Tytuł po `trim()` musi mieć co najmniej 3 znaki.
- Błąd pokazuje alert `Tytuł musi mieć co najmniej 3 znaki.` i nie wywołuje API.
- Podczas `createIncident(title)` przycisk jest wyłączony i pokazuje `Tworzenie…`.
- Nowy incydent pojawia się natychmiast z dopiskiem `(tworzenie…)` przez
  `useOptimistic`, jeszcze przed odpowiedzią API.
- Po sukcesie formularz dodaje wynik API do store'a, czyści draft i zgłasza
  komunikat sukcesu.

Status przycisku odczytaj przez `useFormStatus` w potomnym komponencie formularza.

### Widok

`SupportDesk` subskrybuje store przez `useSyncExternalStore`, renderuje optimistic
projekcję listy i formularz we wspólnym `Panel`, a komunikat sukcesu umieszcza fizycznie w
`toastContainer` przez portal.

Lista ma zachować istniejące incydenty i pokazywać najnowszy jako pierwszy.
