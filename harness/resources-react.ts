import type { LearningResource } from "./resources";

// Audyt: 2026-07-18. Wersja docelowa: React 19.2.
export const REACT_TOPIC_RESOURCES: Record<string, LearningResource[]> = {
  "01-components-props-purity": [
    {
      title: "Twój pierwszy komponent",
      url: "https://react.dev/learn/your-first-component",
      description: "Definiowanie komponentów i składanie interfejsu z mniejszych części.",
    },
    {
      title: "Przekazywanie propsów",
      url: "https://react.dev/learn/passing-props-to-a-component",
      description: "Propsy jako niemutowalne dane wejściowe komponentu.",
    },
    {
      title: "Czyste komponenty",
      url: "https://react.dev/learn/keeping-components-pure",
      description: "Czystość renderowania, unikanie efektów ubocznych i Strict Mode.",
    },
  ],
  "02-jsx-lists-identity": [
    {
      title: "Pisanie znaczników w JSX",
      url: "https://react.dev/learn/writing-markup-with-jsx",
      description: "Reguły składni JSX i różnice względem HTML.",
    },
    {
      title: "Renderowanie list",
      url: "https://react.dev/learn/rendering-lists",
      description: "Mapowanie kolekcji i dobór stabilnych kluczy elementów.",
    },
    {
      title: "Zachowywanie i resetowanie stanu",
      url: "https://react.dev/learn/preserving-and-resetting-state",
      description: "Jak pozycja, typ i key określają tożsamość komponentu.",
    },
  ],
  "03-state-snapshot-batching": [
    {
      title: "Stan jako pamięć komponentu",
      url: "https://react.dev/learn/state-a-components-memory",
      description: "Kiedy używać stanu i jak aktualizacja uruchamia render.",
    },
    {
      title: "Stan jako migawka",
      url: "https://react.dev/learn/state-as-a-snapshot",
      description: "Wartości stanu widziane przez konkretny render i jego handlery.",
    },
    {
      title: "Kolejkowanie aktualizacji stanu",
      url: "https://react.dev/learn/queueing-a-series-of-state-updates",
      description: "Batching oraz aktualizacje funkcyjne zależne od poprzedniej wartości.",
    },
  ],
  "04-immutable-state": [
    {
      title: "Aktualizowanie obiektów w stanie",
      url: "https://react.dev/learn/updating-objects-in-state",
      description: "Niemutowalne kopie obiektów i aktualizowanie zagnieżdżonych danych.",
    },
    {
      title: "Aktualizowanie tablic w stanie",
      url: "https://react.dev/learn/updating-arrays-in-state",
      description: "Dodawanie, usuwanie i zmiana elementów bez mutowania tablicy.",
    },
    {
      title: "Projektowanie struktury stanu",
      url: "https://react.dev/learn/choosing-the-state-structure",
      description: "Unikanie duplikacji, sprzeczności i zbędnego zagnieżdżenia stanu.",
    },
  ],
  "05-accessible-controlled-forms": [
    {
      title: "Reagowanie na dane formularza",
      url: "https://react.dev/learn/reacting-to-input-with-state",
      description: "Kontrolowane pola, walidacja i modelowanie stanów formularza.",
    },
    {
      title: "Dostępne etykiety formularzy",
      url: "https://www.w3.org/WAI/tutorials/forms/labels/",
      description: "Poprawne wiązanie etykiet z kontrolkami i ich dostępne nazwy.",
    },
    {
      title: "Dostępne komunikaty formularza",
      url: "https://www.w3.org/WAI/tutorials/forms/notifications/",
      description: "Przekazywanie błędów i wyniku operacji użytkownikom technologii asystujących.",
    },
  ],
  "06-derived-state-no-effect": [
    {
      title: "Projektowanie struktury stanu",
      url: "https://react.dev/learn/choosing-the-state-structure",
      description: "Wyliczanie danych pochodnych zamiast przechowywania ich drugi raz.",
    },
    {
      title: "Kiedy Effect nie jest potrzebny",
      url: "https://react.dev/learn/you-might-not-need-an-effect",
      description: "Przenoszenie obliczeń do renderu, a logiki interakcji do handlerów.",
    },
    {
      title: "Obsługa zdarzeń",
      url: "https://react.dev/learn/responding-to-events",
      description: "Wykonywanie logiki wynikającej z konkretnej akcji użytkownika.",
    },
  ],
  "07-effects-synchronization": [
    {
      title: "Hook useEffect",
      url: "https://react.dev/reference/react/useEffect",
      description: "Kontrakt setup, cleanup i zależności efektu.",
    },
    {
      title: "Synchronizacja za pomocą efektów",
      url: "https://react.dev/learn/synchronizing-with-effects",
      description: "Łączenie komponentu z systemem zewnętrznym po renderze.",
    },
    {
      title: "Cykl życia efektów reaktywnych",
      url: "https://react.dev/learn/lifecycle-of-reactive-effects",
      description: "Niezależne uruchamianie i zatrzymywanie procesów synchronizacji.",
    },
  ],
  "08-effect-events": [
    {
      title: "Hook useEffectEvent",
      url: "https://react.dev/reference/react/useEffectEvent",
      description: "Odczyt najnowszych wartości bez ponownej synchronizacji efektu.",
    },
    {
      title: "Oddzielanie zdarzeń od efektów",
      url: "https://react.dev/learn/separating-events-from-effects",
      description: "Rozdzielanie logiki reaktywnej od niereaktywnej w Effectach.",
    },
    {
      title: "Usuwanie zależności efektu",
      url: "https://react.dev/learn/removing-effect-dependencies",
      description: "Naprawianie modelu efektu bez ukrywania zależności przed linterem.",
    },
  ],
  "09-fetch-effects": [
    {
      title: "Pobieranie danych w Effect",
      url: "https://react.dev/reference/react/useEffect#fetching-data-with-effects",
      description: "Cleanup, race conditions i bezpieczna aktualizacja wyniku żądania.",
    },
    {
      title: "Pobieranie danych bez zbędnych efektów",
      url: "https://react.dev/learn/you-might-not-need-an-effect#fetching-data",
      description:
        "Ograniczenia ręcznego fetchowania i alternatywy zapewniane przez framework lub cache.",
    },
    {
      title: "AbortController",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
      description: "Anulowanie żądań i przekazywanie AbortSignal do operacji asynchronicznej.",
    },
  ],
  "10-refs-ids": [
    {
      title: "Manipulowanie DOM za pomocą refów",
      url: "https://react.dev/learn/manipulating-the-dom-with-refs",
      description: "Lokalne uchwyty DOM, focus i bezpieczne momenty odczytu refa.",
    },
    {
      title: "Hook useId",
      url: "https://react.dev/reference/react/useId",
      description: "Stabilne identyfikatory do relacji dostępności i hydratacji.",
    },
    {
      title: "Callback ref",
      url: "https://react.dev/reference/react-dom/components/common#ref-callback",
      description: "Rejestrowanie węzłów DOM oraz cleanup callback refa w React 19.",
    },
  ],
  "11-reducer": [
    {
      title: "Hook useReducer",
      url: "https://react.dev/reference/react/useReducer",
      description: "Reducer, akcje, dispatch i inicjalizacja złożonego stanu.",
    },
    {
      title: "Wyodrębnianie logiki do reducera",
      url: "https://react.dev/learn/extracting-state-logic-into-a-reducer",
      description: "Centralizacja przejść stanu i niemutowalne aktualizacje domenowe.",
    },
    {
      title: "Reducer razem z contextem",
      url: "https://react.dev/learn/scaling-up-with-reducer-and-context",
      description: "Udostępnianie stanu i dispatchu w większym drzewie komponentów.",
    },
  ],
  "12-context": [
    {
      title: "Tworzenie contextu",
      url: "https://react.dev/reference/react/createContext",
      description: "Definiowanie contextu i składnia providera w React 19.",
    },
    {
      title: "Odczytywanie contextu",
      url: "https://react.dev/reference/react/useContext",
      description: "Subskrypcja wartości najbliższego providera i aktualizacje konsumentów.",
    },
    {
      title: "Skalowanie reducera z contextem",
      url: "https://react.dev/learn/scaling-up-with-reducer-and-context",
      description: "Rozdzielenie contextów stanu i dispatchu oraz bezpieczne custom hooki.",
    },
  ],
  "13-ui-state-modeling": [
    {
      title: "Modelowanie interakcji stanem",
      url: "https://react.dev/learn/reacting-to-input-with-state",
      description: "Deklaratywne opisanie stanów UI zamiast ręcznego sterowania widokiem.",
    },
    {
      title: "Projektowanie struktury stanu",
      url: "https://react.dev/learn/choosing-the-state-structure",
      description: "Jednoznaczny stan bez sprzecznych flag i zduplikowanych danych.",
    },
    {
      title: "Logika przejść w reducerze",
      url: "https://react.dev/learn/extracting-state-logic-into-a-reducer",
      description: "Jawne akcje i kontrolowanie legalnych przejść między stanami.",
    },
  ],
  "14-form-actions": [
    {
      title: "Formularze i Actions",
      url: "https://react.dev/reference/react-dom/components/form",
      description: "Funkcyjny prop action, FormData, pending i reset formularza.",
    },
    {
      title: "Hook useActionState",
      url: "https://react.dev/reference/react/useActionState",
      description: "Stan wyniku Action, walidacja i sekwencyjne aktualizacje.",
    },
    {
      title: "Actions w React 19",
      url: "https://react.dev/blog/2024/12/05/react-19",
      description: "Model asynchronicznych przejść, błędów, formularzy i optymistycznego UI.",
    },
  ],
  "15-form-status": [
    {
      title: "Hook useFormStatus",
      url: "https://react.dev/reference/react-dom/hooks/useFormStatus",
      description: "Status najbliższego formularza, wysyłane dane i granica potomka.",
    },
    {
      title: "Komponent form",
      url: "https://react.dev/reference/react-dom/components/form",
      description: "Niezależne Actions formularzy, pending i obsługa powodzenia.",
    },
  ],
  "16-optimistic-updates": [
    {
      title: "Hook useOptimistic",
      url: "https://react.dev/reference/react/useOptimistic",
      description: "Natychmiastowy stan optymistyczny i rebazowanie na danych bazowych.",
    },
    {
      title: "Hook useTransition",
      url: "https://react.dev/reference/react/useTransition",
      description: "Oznaczanie asynchronicznych aktualizacji jako nieblokujących przejść.",
    },
    {
      title: "Actions formularzy",
      url: "https://react.dev/reference/react-dom/components/form",
      description: "Łączenie mutacji formularza z pending, błędami i wynikiem.",
    },
  ],
  "17-use-suspense-errors": [
    {
      title: "API use",
      url: "https://react.dev/reference/react/use",
      description: "Czytanie Promise i contextu oraz zawieszanie renderowania.",
    },
    {
      title: "Komponent Suspense",
      url: "https://react.dev/reference/react/Suspense",
      description: "Fallback, stabilność źródła danych i ponowne pokazanie zawartości.",
    },
    {
      title: "Error Boundary",
      url: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
      description: "Izolowanie błędów renderowania i wyświetlanie awaryjnego interfejsu.",
    },
  ],
  "18-external-store": [
    {
      title: "Hook useSyncExternalStore",
      url: "https://react.dev/reference/react/useSyncExternalStore",
      description: "Subskrypcja external store, cache snapshotu i obsługa SSR.",
    },
    {
      title: "Renderowanie do stringa",
      url: "https://react.dev/reference/react-dom/server/renderToString",
      description: "Zachowanie renderu serwerowego używane przy weryfikacji getServerSnapshot.",
    },
  ],
  "19-custom-hooks": [
    {
      title: "Wielokrotne używanie logiki przez custom hooki",
      url: "https://react.dev/learn/reusing-logic-with-custom-hooks",
      description: "Projektowanie API hooka, zależności i cleanup współdzielonej logiki.",
    },
    {
      title: "Hook useDebugValue",
      url: "https://react.dev/reference/react/useDebugValue",
      description: "Czytelna diagnostyka domenowego hooka w React DevTools.",
    },
    {
      title: "Hook useSyncExternalStore",
      url: "https://react.dev/reference/react/useSyncExternalStore",
      description: "Wzorzec hooka integrującego React z zewnętrznym źródłem danych.",
    },
  ],
  "20-composition-ownership": [
    {
      title: "Współdzielenie stanu między komponentami",
      url: "https://react.dev/learn/sharing-state-between-components",
      description: "Właściciel stanu, jedno źródło prawdy i kontrolowane komponenty.",
    },
    {
      title: "Przekazywanie JSX jako children",
      url: "https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children",
      description: "Kompozycja interfejsu przez slot children zamiast sztywnych zależności.",
    },
    {
      title: "API Children",
      url: "https://react.dev/reference/react/Children",
      description: "Ograniczenia introspekcji children i bezpieczniejsze alternatywy kompozycji.",
    },
  ],
  "21-portals-error-boundaries": [
    {
      title: "API createPortal",
      url: "https://react.dev/reference/react-dom/createPortal",
      description: "Renderowanie do innego węzła DOM z zachowaniem drzewa React i contextu.",
    },
    {
      title: "Error Boundary",
      url: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
      description: "Izolowanie awarii widgetu, fallback i reset granicy błędu.",
    },
  ],
  "22-concurrent-ui": [
    {
      title: "Hook useTransition",
      url: "https://react.dev/reference/react/useTransition",
      description: "Rozdzielanie aktualizacji pilnych od nieblokujących.",
    },
    {
      title: "Hook useDeferredValue",
      url: "https://react.dev/reference/react/useDeferredValue",
      description: "Odroczenie kosztownej części widoku i zachowanie poprzedniego wyniku.",
    },
    {
      title: "Komponent Activity",
      url: "https://react.dev/reference/react/Activity",
      description: "Ukrywanie widoku z zachowaniem jego stanu i sprzątaniem efektów.",
    },
  ],
  "23-refs-layout": [
    {
      title: "Hook useImperativeHandle",
      url: "https://react.dev/reference/react/useImperativeHandle",
      description: "Wystawianie wąskiego uchwytu imperatywnego zamiast całego węzła DOM.",
    },
    {
      title: "Hook useLayoutEffect",
      url: "https://react.dev/reference/react/useLayoutEffect",
      description: "Pomiar i korekta layoutu przed ponownym malowaniem ekranu.",
    },
    {
      title: "Ref jako prop w React 19",
      url: "https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop",
      description: "Bezpośrednie przekazywanie refa do komponentu funkcyjnego.",
    },
  ],
  "24-react-compiler": [
    {
      title: "Wprowadzenie do React Compiler",
      url: "https://react.dev/learn/react-compiler/introduction",
      description: "Automatyczna memoizacja i wymagania wynikające z Rules of React.",
    },
    {
      title: "Dyrektywa „use memo”",
      url: "https://react.dev/reference/react-compiler/directives/use-memo",
      description: "Jawne włączanie optymalizacji w trybie stopniowej adopcji.",
    },
    {
      title: "Dyrektywa „use no memo”",
      url: "https://react.dev/reference/react-compiler/directives/use-no-memo",
      description: "Tymczasowe wyłączanie kompilacji i ograniczenia tej ucieczki.",
    },
  ],
  "25-manual-memoization": [
    {
      title: "Komponent Profiler",
      url: "https://react.dev/reference/react/Profiler",
      description: "Pomiar kosztu renderów i liczby commitów przed optymalizacją.",
    },
    {
      title: "API memo",
      url: "https://react.dev/reference/react/memo",
      description: "Pomijanie renderu przy niezmienionych propsach i koszty porównania.",
    },
    {
      title: "Hooki wydajnościowe React",
      url: "https://react.dev/reference/react#performance-hooks",
      description: "Oficjalne zestawienie useMemo i useCallback oraz ich zastosowań.",
    },
  ],
  "26-debugging-rendering": [
    {
      title: "Cykl życia efektów reaktywnych",
      url: "https://react.dev/learn/lifecycle-of-reactive-effects",
      description: "Diagnozowanie wielokrotnych subskrypcji i brakującego cleanupu.",
    },
    {
      title: "Reguła exhaustive-deps",
      url: "https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-deps",
      description: "Wykrywanie stale closure i niepełnych zależności hooków.",
    },
    {
      title: "Komponent Profiler",
      url: "https://react.dev/reference/react/Profiler",
      description: "Lokalizowanie zbędnych commitów i kosztownych poddrzew.",
    },
  ],
  "26b-optimize-slow-view": [
    {
      title: "Komponent Profiler",
      url: "https://react.dev/reference/react/Profiler",
      description: "Pomiar efektu refaktoru zamiast optymalizowania na wyczucie.",
    },
    {
      title: "Kiedy używać memo",
      url: "https://react.dev/reference/react/memo#should-you-add-memo-everywhere",
      description: "Koszty i ograniczenia powszechnej memoizacji komponentów.",
    },
    {
      title: "Współdzielenie i lokalizacja stanu",
      url: "https://react.dev/learn/sharing-state-between-components",
      description: "Dobór właściciela stanu ograniczający zasięg ponownych renderów.",
    },
  ],
  "27-component-testing": [
    {
      title: "Zasady Testing Library",
      url: "https://testing-library.com/docs/guiding-principles/",
      description: "Testowanie zachowania podobnie do sposobu używania aplikacji.",
    },
    {
      title: "Zapytania po roli",
      url: "https://testing-library.com/docs/queries/byrole/",
      description: "Wyszukiwanie elementów przez role i dostępne nazwy.",
    },
    {
      title: "Wprowadzenie do user-event",
      url: "https://testing-library.com/docs/user-event/intro/",
      description: "Realistyczne interakcje użytkownika i poprawne oczekiwanie na ich wynik.",
    },
  ],
  "28-accessible-widgets": [
    {
      title: "Wzorzec dostępnych tabów",
      url: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
      description: "Role ARIA, roving tabindex i obsługa klawiatury w zakładkach.",
    },
    {
      title: "Wzorzec modalnego dialogu",
      url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
      description: "Pułapka focusu, Escape i przywrócenie focusu do triggera.",
    },
    {
      title: "Wzorzec komunikatu alert",
      url: "https://www.w3.org/WAI/ARIA/apg/patterns/alert/",
      description: "Ogłaszanie dynamicznych komunikatów bez nieoczekiwanej zmiany focusu.",
    },
  ],
  "29-large-lists": [
    {
      title: "Dokumentacja react-window",
      url: "https://react-window.vercel.app/",
      description: "Aktualne API List i konfiguracja windowingu dużych kolekcji.",
    },
    {
      title: "Repozytorium react-window",
      url: "https://github.com/bvaughn/react-window",
      description: "Oficjalne przykłady, typy i informacje o bieżącej wersji biblioteki.",
    },
    {
      title: "Stabilne klucze listy",
      url: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
      description: "Zachowanie tożsamości wierszy po zmianie kolejności danych.",
    },
  ],
  "30-dynamic-styles": [
    {
      title: "Style CSS w React",
      url: "https://react.dev/reference/react-dom/components/common#applying-css-styles",
      description: "Dobór className, obiektu style i jednostek wartości.",
    },
    {
      title: "Własne właściwości CSS",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",
      description: "Definiowanie, dziedziczenie i używanie dynamicznych tokenów CSS.",
    },
    {
      title: "Właściwość HTMLElement.style",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style",
      description: "Typ i semantyka inline styles ustawianych na elemencie DOM.",
    },
  ],
  "31-server-state": [
    {
      title: "Klucze zapytań TanStack Query",
      url: "https://tanstack.com/query/latest/docs/framework/react/guides/query-keys",
      description: "Stabilne, serializowalne klucze oddzielające wpisy cache'u.",
    },
    {
      title: "Anulowanie zapytań",
      url: "https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation",
      description: "Korzystanie z AbortSignal przekazywanego do queryFn.",
    },
    {
      title: "Aktualizacje optymistyczne",
      url: "https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates",
      description: "Snapshot cache'u, rollback i invalidacja po zakończeniu mutacji.",
    },
  ],
  "module-01": [
    {
      title: "Reducer razem z contextem",
      url: "https://react.dev/learn/scaling-up-with-reducer-and-context",
      description: "Architektura wieloplikowego stanu z providerami i dispatch.",
    },
    {
      title: "Projektowanie struktury stanu",
      url: "https://react.dev/learn/choosing-the-state-structure",
      description: "Jedno źródło prawdy, stabilne identyfikatory i dane pochodne.",
    },
    {
      title: "Wprowadzenie do React Testing Library",
      url: "https://testing-library.com/docs/react-testing-library/intro/",
      description: "Integracyjne testowanie komponentów przez ich publiczne zachowanie.",
    },
  ],
  "module-02": [
    {
      title: "API use i Suspense",
      url: "https://react.dev/reference/react/use",
      description: "Czytanie stabilnego zasobu początkowego pod granicą Suspense.",
    },
    {
      title: "Formularze i Actions",
      url: "https://react.dev/reference/react-dom/components/form",
      description: "Walidacja, pending i wynik wieloplikowego przepływu formularza.",
    },
    {
      title: "Hook useOptimistic",
      url: "https://react.dev/reference/react/useOptimistic",
      description: "Optymistyczna mutacja oraz powrót do potwierdzonych danych.",
    },
  ],
  "module-03": [
    {
      title: "Aktualizacje optymistyczne TanStack Query",
      url: "https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates",
      description: "Anulowanie refetchu, snapshot, rollback i końcowa invalidacja cache'u.",
    },
    {
      title: "Wzorzec dostępnych tabów",
      url: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
      description: "Role, focus i obsługa klawiatury dla filtra konsoli.",
    },
    {
      title: "Wzorzec modalnego dialogu",
      url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
      description: "Zarządzanie focusem, Escape i semantyka dialogu przypisania.",
    },
  ],
};
