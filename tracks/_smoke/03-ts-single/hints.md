## Hint 1

Wynik to mapa o kluczach `string` i wartościach `number`. W TypeScripcie zapiszesz
to jako `Record<string, number>`.

## Hint 2

Przelej wpisy dwiema pętlami (`for…of` po `entries`, potem po `entry.tags`)
i zwiększaj licznik: `counts[tag] = (counts[tag] ?? 0) + 1`. Nowy obiekt `counts`
zamiast modyfikowania `entries` załatwia warunek „nie mutuje wejścia".
