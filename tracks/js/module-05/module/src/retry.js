export async function withRetry(task, options = {}) {
  // TODO: uruchom task(); przy odrzuceniu ponów, aż do `retries` prób,
  // z backoffem wykładniczym. options: { retries = 2, backoffMs = 50 }.
  //  - sukces task() → zwróć wynik
  //  - błąd → zapamiętaj i spróbuj ponownie, o ile zostały próby
  //  - przed każdą kolejną próbą czekaj backoffMs * 2 ** (numer_próby - 1)
  //  - po wyczerpaniu prób rzuć ostatni błąd
}
