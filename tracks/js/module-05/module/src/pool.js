export function createPool(concurrency = 4) {
  // TODO: pool z limitem współbieżności. Zwróć { run, runAll, active, maxActive }:
  //  - run(task): task to funkcja zwracająca Promise; zwróć Promise z jej wynikiem.
  //    Startuj najwyżej `concurrency` zadań naraz; po zakończeniu jednego ruszaj
  //    kolejne z kolejki (pomocnik pump() startujący zadania póki jest miejsce).
  //  - runAll(tasks): Promise.all z run() dla każdego zadania (wyniki w kolejności)
  //  - active (getter): ile teraz działa; maxActive (getter): rekord równoczesnych
  // Trzymaj active, maxActive i tablicę oczekujących w domknięciu.
}
