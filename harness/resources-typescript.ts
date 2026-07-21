import type { LearningResource } from "./resources";

// Audyt źródeł: 2026-07-18.
// Wersja docelowa: TypeScript 7.0; TypeScript 6.0 pozostaje kontekstem migracyjnym.
export const TS_BASE_TOPIC_RESOURCES: Record<string, LearningResource[]> = {
  "01-basic-types": [
    {
      title: "Codzienne typy w TypeScript",
      url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
      description:
        "Typy podstawowe, inferencja, literały, tablice, unie oraz bezpieczne użycie unknown zamiast any.",
    },
    {
      title: "Asercje const",
      url: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions",
      description:
        "Zachowanie literałów, readonly właściwości i readonly tuple po użyciu as const.",
    },
  ],
  "02-unions-narrowing": [
    {
      title: "Zawężanie typów",
      url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
      description:
        "Strażnicy typów, unie rozłączne, predykaty, assertion functions i kontrola wyczerpania przez never.",
    },
  ],
  "03-objects": [
    {
      title: "Typy obiektowe",
      url: "https://www.typescriptlang.org/docs/handbook/2/objects.html",
      description:
        "Interface, type, readonly, pola opcjonalne, index signatures i excess property checks.",
    },
    {
      title: "Opcja exactOptionalPropertyTypes",
      url: "https://www.typescriptlang.org/tsconfig/exactOptionalPropertyTypes.html",
      description:
        "Precyzyjna różnica między nieobecnym polem opcjonalnym a polem zawierającym undefined.",
    },
  ],
  "04-functions": [
    {
      title: "Funkcje w TypeScript",
      url: "https://www.typescriptlang.org/docs/handbook/2/functions.html",
      description:
        "Sygnatury wywołań, przeciążenia, callbacki, this oraz semantyka void, unknown i never.",
    },
  ],
  "05-generics": [
    {
      title: "Generyki",
      url: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
      description:
        "Parametry typu, inferencja, generyczne funkcje, interfejsy i klasy zachowujące relacje między typami.",
    },
  ],
  "06-generic-constraints": [
    {
      title: "Ograniczenia generyków",
      url: "https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints",
      description:
        "Ograniczanie parametrów typu przez extends i keyof oraz zależności między argumentami generycznego API.",
    },
  ],
  "07-utility-types": [
    {
      title: "Typy narzędziowe",
      url: "https://www.typescriptlang.org/docs/handbook/utility-types.html",
      description:
        "Oficjalna referencja Partial, Required, Readonly, Pick, Omit, Record, Awaited i typów funkcji.",
    },
  ],
  "08-mapped-types": [
    {
      title: "Typy mapowane",
      url: "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html",
      description:
        "Transformowanie właściwości, modyfikatory readonly i optional oraz przepisywanie kluczy przez as.",
    },
  ],
  "09-conditional-types": [
    {
      title: "Typy warunkowe",
      url: "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html",
      description:
        "Warunki extends, infer, rozdzielność po uniach i kontrolowanie jej przez opakowanie w tuple.",
    },
  ],
  "10-template-literal-types": [
    {
      title: "Typy literałów szablonowych",
      url: "https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html",
      description:
        "Budowanie i parsowanie typowanych stringów, intrinsic string types oraz generowanie nazw pól.",
    },
  ],
  "11-classes": [
    {
      title: "Klasy w TypeScript",
      url: "https://www.typescriptlang.org/docs/handbook/2/classes.html",
      description:
        "Pola, konstruktory, widoczność, parameter properties, implements, abstract i typ strony statycznej.",
    },
    {
      title: "Prywatne elementy klas",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements",
      description:
        "Runtime’owa semantyka pól #private i różnice względem kompilacyjnego private TypeScriptu.",
    },
  ],
  "12-enums-satisfies": [
    {
      title: "Wyliczenia enum",
      url: "https://www.typescriptlang.org/docs/handbook/enums.html",
      description:
        "Semantyka enumów liczbowych i tekstowych, emitowany kod oraz alternatywa w postaci obiektu as const.",
    },
    {
      title: "Operator satisfies",
      url: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator",
      description:
        "Sprawdzanie zgodności wartości z kontraktem bez utraty jej precyzyjnie wywnioskowanego typu.",
    },
    {
      title: "Opcja erasableSyntaxOnly",
      url: "https://www.typescriptlang.org/tsconfig/erasableSyntaxOnly.html",
      description:
        "Wykrywanie enumów i innych konstrukcji emitujących runtime przed uruchamianiem TypeScriptu przez type stripping.",
    },
  ],
};
