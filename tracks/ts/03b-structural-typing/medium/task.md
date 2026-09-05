# Medium - dokładna konfiguracja workera

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zwykły parametr `WorkerConfig` łapie nadmiarowe pola tylko dla świeżego literału.
Zbuduj generyczny typ `Exact<Shape, Candidate>` i funkcję `defineWorkerConfig`, które
odrzucą dodatkowe klucze także wtedy, gdy konfiguracja najpierw trafiła do zmiennej.

```ts
type WorkerConfig = {
  queue: string;
  concurrency: number;
  retry: boolean;
};
```

Funkcja ma zachować dokładny typ wejścia i zwrócić zamrożoną kopię przez
`Object.freeze`. Nie używaj `any`.
