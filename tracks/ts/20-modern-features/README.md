# Nowoczesne mechanizmy: dekoratory i zarządzanie zasobami

To elective, a nie domyślny sposób pisania każdej klasy. Standardowe dekoratory oraz
explicit resource management są przydatne w bibliotekach, frameworkach i kodzie
infrastrukturalnym, ale zwiększają ilość mechaniki ukrytej przed czytelnikiem.

## Standardowe dekoratory

Dekoratory od TypeScript 5.0 używają modelu ECMAScript: otrzymują dekorowaną wartość
oraz kontekst, np. `ClassMethodDecoratorContext`. To inny kontrakt niż legacy
`experimentalDecorators`.

Dobrze typowany dekorator metody zachowuje:

- typ `this`,
- tuple argumentów,
- typ wyniku,
- nazwę i rodzaj elementu z obiektu context.

## `using`

Obiekt z metodą `[Symbol.dispose]()` spełnia kontrakt `Disposable`. Zmienna zadeklarowana
przez `using` zostanie zwolniona przy każdym wyjściu ze scope: po sukcesie, `return`
i wyjątku. TypeScript może przetransformować składnię dla runtime bez natywnego `using`.

## `DisposableStack`

Stos pozwala składać kilka zasobów i callbacków cleanup. Zwalnia je w odwrotnej
kolejności. `move()` przenosi odpowiedzialność do nowego stosu, co jest szczególnie
przydatne w konstruktorach otwierających kilka zasobów.

Wsparcie runtime trzeba sprawdzić osobno. Sam fakt, że TypeScript zna globalny typ,
nie oznacza, że bieżący Node lub przeglądarka udostępnia konstruktor.

## Kiedy używać

- w bibliotekach otwierających pliki, locki, subskrypcje i połączenia,
- dla przekrojowego logowania lub instrumentacji metod,
- gdy wiele zasobów musi być zwalnianych w LIFO także przy częściowej inicjalizacji.

## Kiedy unikać

- dekoratorów ukrywających kluczową logikę biznesową,
- `using`, gdy zasób ma żyć dłużej niż lokalny scope,
- zakładania globalnego `DisposableStack` bez sprawdzenia wspieranego runtime.

## Pułapki

- legacy i standard decorators mają inne sygnatury oraz semantykę,
- dekorator sync nie mierzy automatycznie czasu zakończenia zwróconego Promise,
- cleanup może sam rzucić błąd, ale pozostałe zasoby nadal powinny zostać zwolnione,
- `move()` unieważnia stary stos,
- typy z `ESNext.Disposable` nie są polyfillem runtime.

Źródła: TypeScript 5.0 — decorators; TypeScript 5.2 — explicit resource management;
propozycje TC39 dla decorators i explicit resource management.
