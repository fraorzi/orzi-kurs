export function createQueue(concurrency = 4) {
  // TODO: kolejka z limitem współbieżności. Zwróć { add, active, pending }:
  //  - add(task): wrzuca zadanie (funkcja zwracająca Promise) do kolejki i zwraca
  //    Promise rozstrzygany wynikiem task(); uruchamia się, gdy zwolni się slot
  //  - w danym momencie działa najwyżej `concurrency` zadań na raz
  //  - gdy zadanie się kończy, wystartuj następne z kolejki
  //  - active (getter): ile zadań aktualnie działa; pending (getter): ile czeka
  // Wskazówka: trzymaj licznik `active` i tablicę oczekujących w domknięciu.
}
