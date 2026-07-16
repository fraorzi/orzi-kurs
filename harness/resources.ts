export interface LearningResource {
  title: string;
  url: string;
  description: string;
}

const MDN = "https://developer.mozilla.org/en-US/docs/Web/JavaScript";

const TOPIC_RESOURCES: Record<string, LearningResource[]> = {
  "01-functions": [
    { title: "Funkcje w JavaScript", url: `${MDN}/Guide/Functions`, description: "Deklaracje, parametry, zwracanie wartości i funkcje strzałkowe." },
  ],
  "02-scope": [
    { title: "Zakres zmiennych", url: `${MDN}/Guide/Grammar_and_types#variable_scope`, description: "Jak let, const i var zachowują się w zasięgu bloku i funkcji." },
  ],
  "03-types-coercion": [
    { title: "Porównania i identyczność", url: `${MDN}/Guide/Equality_comparisons_and_sameness`, description: "Różnice między porównaniem ścisłym, luźnym i Object.is()." },
  ],
  "04-loops": [
    { title: "Pętle i iteracja", url: `${MDN}/Guide/Loops_and_iteration`, description: "Przegląd for, while, break, continue i for…of." },
  ],
  "05-strings": [
    { title: "String", url: `${MDN}/Reference/Global_Objects/String`, description: "Metody i zachowanie tekstu w JavaScript." },
  ],
  "05b-unicode": [
    { title: "Unicode i ciągi znaków", url: `${MDN}/Guide/Grammar_and_types#unicode`, description: "Kodowanie znaków, sekwencje ucieczki i zapis Unicode." },
  ],
  "05c-intl-segmenter": [
    { title: "Intl.Segmenter", url: `${MDN}/Reference/Global_Objects/Intl/Segmenter`, description: "Dzielenie tekstu na słowa, zdania i grafemy zgodnie z językiem." },
  ],
  "06-objects": [
    { title: "Praca z obiektami", url: `${MDN}/Guide/Working_with_objects`, description: "Tworzenie, odczyt i modyfikowanie właściwości obiektów." },
  ],
  "07-destructuring": [
    { title: "Destrukturyzacja", url: `${MDN}/Reference/Operators/Destructuring`, description: "Rozpakowywanie tablic i obiektów oraz wartości domyślne." },
  ],
  "08-closures": [
    { title: "Domknięcia", url: `${MDN}/Guide/Closures`, description: "Jak funkcja zapamiętuje swój leksykalny zakres." },
  ],
  "09-array-methods": [
    { title: "Array", url: `${MDN}/Reference/Global_Objects/Array`, description: "Przegląd metod tablic, w tym map, filter i reduce." },
  ],
  "09b-modules": [
    { title: "Moduły JavaScript", url: `${MDN}/Guide/Modules`, description: "Importy, eksporty, żywe wiązania, re-eksport i dynamiczne ładowanie modułów." },
    { title: "import", url: `${MDN}/Reference/Statements/import`, description: "Oficjalna składnia statycznych importów i zasady wiązań modułowych." },
  ],
  "10-promises": [
    { title: "Promise", url: `${MDN}/Reference/Global_Objects/Promise`, description: "Model obietnic, łańcuchy i obsługa wyniku asynchronicznego." },
  ],
  "10b-promise-withresolvers": [
    { title: "Promise.withResolvers()", url: `${MDN}/Reference/Global_Objects/Promise/withResolvers`, description: "Tworzenie obietnicy razem z funkcjami resolve i reject." },
  ],
  "11-async-await": [
    { title: "async function", url: `${MDN}/Reference/Statements/async_function`, description: "Zasady działania async/await i zwracanych obietnic." },
  ],
  "12-event-loop": [
    { title: "Model wykonania i event loop", url: `${MDN}/Event_loop`, description: "Stos wywołań, kolejki zadań i kolejność wykonywania kodu." },
  ],
  "13-this-bind": [
    { title: "this", url: `${MDN}/Reference/Operators/this`, description: "Jak sposób wywołania funkcji ustala wartość this." },
  ],
  "14-prototypes": [
    { title: "Łańcuch prototypów", url: `${MDN}/Guide/Inheritance_and_the_prototype_chain`, description: "Dziedziczenie oparte na prototypach i wyszukiwanie właściwości." },
  ],
  "15-classes": [
    { title: "Klasy", url: `${MDN}/Reference/Classes`, description: "Konstruktory, pola, metody i dziedziczenie klas." },
  ],
  "16-error-handling": [
    { title: "Sterowanie przepływem i błędy", url: `${MDN}/Guide/Control_flow_and_error_handling`, description: "throw, try/catch/finally i rodzaje błędów." },
  ],
  "16b-async-errors": [
    { title: "Obsługa błędów w Promise", url: `${MDN}/Guide/Using_promises#error_handling`, description: "Propagacja odrzuceń i poprawne przechwytywanie błędów asynchronicznych." },
  ],
  "17-map-set": [
    { title: "Map", url: `${MDN}/Reference/Global_Objects/Map`, description: "Kolekcja par klucz–wartość i jej typowe operacje." },
    { title: "Set", url: `${MDN}/Reference/Global_Objects/Set`, description: "Kolekcja unikalnych wartości i operacje na zbiorach." },
  ],
  "17b-set-operations": [
    { title: "Operacje na Set", url: `${MDN}/Reference/Global_Objects/Set#set_composition`, description: "Suma, część wspólna, różnica i relacje między zbiorami." },
  ],
  "17c-grouping": [
    { title: "Map.groupBy()", url: `${MDN}/Reference/Global_Objects/Map/groupBy`, description: "Grupowanie elementów według klucza wyliczanego przez funkcję." },
  ],
  "18-weakmap-weakset": [
    { title: "WeakMap", url: `${MDN}/Reference/Global_Objects/WeakMap`, description: "Słabe referencje do kluczy obiektowych i ich zastosowania." },
  ],
  "18b-weakref": [
    { title: "WeakRef", url: `${MDN}/Reference/Global_Objects/WeakRef`, description: "Słabe referencje, garbage collection i ograniczenia API." },
  ],
  "19-debug-logic": [
    { title: "Instrukcja debugger", url: `${MDN}/Reference/Statements/debugger`, description: "Zatrzymywanie programu i analizowanie jego stanu krok po kroku." },
  ],
  "20-iterators": [
    { title: "Iteratory i generatory", url: `${MDN}/Guide/Iterators_and_Generators`, description: "Protokoły iterable/iterator i działanie for…of." },
  ],
  "20b-iterator-helpers": [
    { title: "Iterator", url: `${MDN}/Reference/Global_Objects/Iterator`, description: "Wbudowane helpery do leniwego przetwarzania sekwencji." },
  ],
  "21-generators": [
    { title: "Generator", url: `${MDN}/Reference/Global_Objects/Generator`, description: "Wstrzymywanie wykonania funkcji i zwracanie kolejnych wartości." },
  ],
  "21b-async-generators": [
    { title: "AsyncGenerator", url: `${MDN}/Reference/Global_Objects/AsyncGenerator`, description: "Asynchroniczne sekwencje, yield i for await…of." },
  ],
  "22-property-descriptors": [
    { title: "Object.defineProperty()", url: `${MDN}/Reference/Global_Objects/Object/defineProperty`, description: "Deskryptory value, writable, enumerable i configurable." },
  ],
  "22b-proxy-reflect": [
    { title: "Proxy", url: `${MDN}/Reference/Global_Objects/Proxy`, description: "Przechwytywanie podstawowych operacji wykonywanych na obiekcie." },
    { title: "Reflect", url: `${MDN}/Reference/Global_Objects/Reflect`, description: "Standardowe przekazywanie operacji wewnątrz trapów Proxy." },
  ],
  "23-immutability": [
    { title: "Object.freeze()", url: `${MDN}/Reference/Global_Objects/Object/freeze`, description: "Płytka niezmienność obiektu i jej ograniczenia." },
  ],
  "24-event-emitter": [
    { title: "Node.js Events", url: "https://nodejs.org/api/events.html", description: "Oficjalny model emitterów, listenerów i obsługi zdarzeń." },
  ],
  "25-debounce-throttle": [
    { title: "setTimeout()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout", description: "Planowanie opóźnionych wywołań i anulowanie timera." },
  ],
  "25b-debounce-variants": [
    { title: "AbortController", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController", description: "Ogólny wzorzec anulowania trwających operacji." },
  ],
  "26-debug-async": [
    { title: "Model wykonania JavaScript", url: `${MDN}/Event_loop`, description: "Kolejki zadań pomagają zrozumieć kolejność w kodzie async." },
  ],
  "27-recursion": [
    { title: "Rekurencja", url: "https://developer.mozilla.org/en-US/docs/Glossary/Recursion", description: "Warunek końca i wywoływanie funkcji przez samą siebie." },
  ],
  "27b-trampoline": [
    { title: "Rekurencja i stos", url: "https://developer.mozilla.org/en-US/docs/Glossary/Recursion", description: "Podstawa do zrozumienia, dlaczego głęboka rekurencja przepełnia stos." },
  ],
  "28-json": [
    { title: "JSON", url: `${MDN}/Reference/Global_Objects/JSON`, description: "Serializacja, parsowanie i ograniczenia formatu JSON." },
  ],
  "29-numbers": [
    { title: "Number", url: `${MDN}/Reference/Global_Objects/Number`, description: "Liczby zmiennoprzecinkowe, walidacja i metody numeryczne." },
  ],
  "29b-bigint": [
    { title: "BigInt", url: `${MDN}/Reference/Global_Objects/BigInt`, description: "Liczby całkowite poza bezpiecznym zakresem Number." },
  ],
  "30-date": [
    { title: "Date", url: `${MDN}/Reference/Global_Objects/Date`, description: "Daty, znaczniki czasu, strefy i formatowanie." },
  ],
  "31-regex": [
    { title: "Wyrażenia regularne", url: `${MDN}/Guide/Regular_expressions`, description: "Składnia wzorców, grupy, flagi i praktyczne użycie." },
  ],
  "31b-regex-advanced": [
    { title: "RegExp", url: `${MDN}/Reference/Global_Objects/RegExp`, description: "Pełna referencja obiektu i zaawansowanych elementów wzorca." },
  ],
  "32-fetch": [
    { title: "Korzystanie z Fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch", description: "Żądania, odpowiedzi, błędy HTTP i anulowanie fetch." },
  ],
  "33-debug-perf": [
    { title: "Performance API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Performance", description: "Pomiary czasu i analizowanie wydajności kodu." },
  ],
  "34-optimize-data-structures": [
    { title: "Kolekcje indeksowane i kluczowane", url: `${MDN}/Guide/Keyed_collections`, description: "Dobór Object, Map, Set i WeakMap do sposobu dostępu do danych." },
  ],
  "35-optimize-repeated-work": [
    { title: "Map jako pamięć wyników", url: `${MDN}/Reference/Global_Objects/Map`, description: "Właściwości Map przydatne przy cache’owaniu powtarzanych obliczeń." },
  ],
  "36-optimize-allocations": [
    { title: "structuredClone()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone", description: "Koszt i semantyka głębokiego kopiowania wartości." },
  ],
  "37-optimize-async": [
    { title: "Współbieżność Promise", url: `${MDN}/Reference/Global_Objects/Promise#promise_concurrency`, description: "Dobór all, allSettled, any i race do pracy asynchronicznej." },
  ],
  "02b-advanced-narrowing": [
    { title: "Narrowing", url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html", description: "Predykaty, assertion functions, unie rozłączne i wyczerpanie przez never." },
    { title: "TypeScript 5.5", url: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html", description: "Zasady inferowanych predykatów typu." },
  ],
  "03b-structural-typing": [
    { title: "Type Compatibility", url: "https://www.typescriptlang.org/docs/handbook/type-compatibility.html", description: "Oficjalny opis strukturalnego modelu zgodności TypeScript." },
    { title: "Object Types", url: "https://www.typescriptlang.org/docs/handbook/2/objects.html", description: "Excess property checks i kontrakty obiektowe." },
  ],
  "04b-type-operators": [
    { title: "Creating Types from Types", url: "https://www.typescriptlang.org/docs/handbook/2/types-from-types.html", description: "Mapa operatorów keyof, typeof i indexed access." },
  ],
  "06b-modern-generics": [
    { title: "TypeScript 5.0", url: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#const-type-parameters", description: "Const type parameters i zachowanie literalnej inferencji." },
    { title: "NoInfer", url: "https://www.typescriptlang.org/docs/handbook/utility-types.html#noinfertype", description: "Blokowanie wybranego źródła inferencji w generycznym API." },
  ],
  "06c-tuples": [
    { title: "TypeScript 4.0", url: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types", description: "Variadic i labeled tuple types." },
  ],
  "10b-recursive-types": [
    { title: "Conditional Types", url: "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html", description: "Warunki, infer i podstawy rekurencyjnych transformacji." },
    { title: "TypeScript 4.5", url: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#tail-recursion-elimination-on-conditional-types", description: "Tail recursion elimination oraz limity kosztownych typów." },
  ],
  "13-modules-declarations": [
    { title: "Modules", url: "https://www.typescriptlang.org/docs/handbook/2/modules.html", description: "Importy, eksporty, rozwiązywanie modułów i publiczne API." },
    { title: "Declaration Files", url: "https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html", description: "Pisanie i testowanie deklaracji dla istniejącego JavaScriptu." },
  ],
  "13b-module-augmentation": [
    { title: "Declaration Merging", url: "https://www.typescriptlang.org/docs/handbook/declaration-merging.html", description: "Scalanie interfejsów i module augmentation." },
  ],
  "13c-strict-tsconfig": [
    { title: "TSConfig Reference", url: "https://www.typescriptlang.org/tsconfig/", description: "Oficjalna dokumentacja opcji kompilatora." },
    { title: "verbatimModuleSyntax", url: "https://www.typescriptlang.org/tsconfig/verbatimModuleSyntax.html", description: "Jawne importy i eksporty typów zgodne z emitowanym ESM." },
  ],
  "14-debug-types": [
    { title: "The Basics", url: "https://www.typescriptlang.org/docs/handbook/2/basic-types.html", description: "Różnice między any i unknown oraz źródła utraty bezpieczeństwa typów." },
    { title: "Generics", url: "https://www.typescriptlang.org/docs/handbook/2/generics.html", description: "Relacje między parametrami typów, argumentami i wynikiem." },
  ],
  "14b-variance": [
    { title: "strictFunctionTypes", url: "https://www.typescriptlang.org/tsconfig/strictFunctionTypes.html", description: "Bezpieczniejsze sprawdzanie parametrów callbacków i wyjątek metod." },
    { title: "Type Compatibility", url: "https://www.typescriptlang.org/docs/handbook/type-compatibility.html", description: "Kowariancja, kontrawariancja i bivariance w modelu strukturalnym." },
  ],
  "14c-type-tests": [
    { title: "TypeScript Comment Directives", url: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html#-ts-expect-error-comments", description: "Celowe testy negatywne i zachowanie nieużytej dyrektywy." },
    { title: "DefinitelyTyped", url: "https://github.com/DefinitelyTyped/DefinitelyTyped", description: "Praktyczny wzorzec utrzymywania testów kontraktów deklaracji." },
  ],
  "15-optimize-runtime": [
    { title: "Object Types", url: "https://www.typescriptlang.org/docs/handbook/2/objects.html#the-readonlyarray-type", description: "Kontrakty readonly pozwalają optymalizować lokalną implementację bez mutowania wejścia." },
    { title: "Type Compatibility", url: "https://www.typescriptlang.org/docs/handbook/type-compatibility.html", description: "Zachowanie zgodności sygnatur funkcji i publicznych typów podczas refaktoru." },
    { title: "Map", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map", description: "Indeksowanie, kolejność wstawienia i budowanie ograniczonego cache LRU." },
  ],
  "16-async-types": [
    { title: "Awaited", url: "https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype", description: "Rekurencyjne rozpakowywanie Promise i zachowanie typów wyników async." },
    { title: "AbortSignal", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal", description: "Standardowy kontrakt anulowania operacji asynchronicznych." },
  ],
  "17-runtime-boundaries": [
    { title: "Narrowing", url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html", description: "Bezpieczne zawężanie wartości unknown na granicach systemu." },
    { title: "Symbols", url: "https://www.typescriptlang.org/docs/handbook/symbols.html#unique-symbol", description: "Unique symbol jako podstawa nominalnych branded types." },
  ],
  "17b-dom-events": [
    { title: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event", description: "Model target, currentTarget i propagacji zdarzeń DOM." },
    { title: "FormData", url: "https://developer.mozilla.org/en-US/docs/Web/API/FormData", description: "Odczytywanie i interpretowanie wartości formularza." },
    { title: "Element.closest()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/closest", description: "Bezpieczna delegacja zdarzeń z elementów potomnych." },
  ],
  "18-type-challenges": [
    { title: "Type Challenges", url: "https://github.com/type-challenges/type-challenges", description: "Popularny zestaw zadań medium użyty jako punkt odniesienia dla egzaminu." },
    { title: "Mapped Types", url: "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html", description: "Mapowanie unii i key remapping dla kontraktów eventów." },
    { title: "Template Literal Types", url: "https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html", description: "Rekurencyjne parsowanie parametrów z literału trasy." },
    { title: "Conditional Types", url: "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html", description: "Dystrybucja po uniach, infer oraz składanie typów wynikowych." },
  ],
};

const MODULE_RESOURCES: LearningResource[] = [
  { title: "Przewodnik po JavaScript", url: `${MDN}/Guide`, description: "Uporządkowane przypomnienie mechanizmów języka przydatnych w zadaniach modułowych." },
  { title: "Moduły JavaScript", url: `${MDN}/Guide/Modules`, description: "Import, export i organizacja kodu w wielu plikach." },
];

const TS_HANDBOOK = "https://www.typescriptlang.org/docs/handbook";

const TS_FALLBACK_RESOURCES: LearningResource[] = [
  { title: "TypeScript Handbook", url: `${TS_HANDBOOK}/intro.html`, description: "Oficjalny przewodnik po systemie typów TypeScript." },
];

const TS_MODULE_RESOURCES: LearningResource[] = [
  ...TS_FALLBACK_RESOURCES,
  { title: "Moduły w TypeScript", url: `${TS_HANDBOOK}/modules/introduction.html`, description: "Import, export i organizacja typowanego kodu w wielu plikach." },
];

export function resourcesForTask(taskId: string): LearningResource[] {
  const [track, topic] = taskId.split("/");
  if (!topic) return [];
  if (track === "ts") {
    return topic.startsWith("module-") ? TS_MODULE_RESOURCES : (TOPIC_RESOURCES[topic] ?? TS_FALLBACK_RESOURCES);
  }
  if (topic.startsWith("module-")) return MODULE_RESOURCES;
  return TOPIC_RESOURCES[topic] ?? [
    { title: "Przewodnik po JavaScript", url: `${MDN}/Guide`, description: "Dokumentacja podstaw języka i jego najważniejszych mechanizmów." },
  ];
}
