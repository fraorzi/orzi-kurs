# Module 02 — panel obsługi incydentów

Wieloplikowy moduł łączący materiał 14–21 w jednym przepływie zbliżonym do pracy
produkcyjnej:

- zewnętrzny store z cache'owanym niemutowalnym snapshotem,
- stabilny zasób początkowej listy czytany przez `use` pod Suspense,
- custom hook zapisujący draft,
- React 19 Form Action z walidacją i stanem pending,
- optimistic mutation widoczna przed odpowiedzią API,
- kompozycja przez `children`,
- portal z komunikatem sukcesu,
- test integracyjny zachowania zamiast testowania szczegółów implementacji.

Moduł nie używa serwera ani sieci. Async API i storage są wstrzykiwane, więc testy
pozostają szybkie i deterministyczne.
