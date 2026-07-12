export async function fetchWithRetry(url, retries = 2) {
  // TODO: pętla prób (retries + 1 razy):
  //  - fetch odrzucił (błąd sieci) -> zapamiętaj błąd i ponów
  //  - res.ok -> zwróć res.json()
  //  - 4xx -> rzuć od razu `HTTP ${res.status}` (bez ponawiania)
  //  - 5xx -> zapamiętaj błąd i ponów
  // po wyczerpaniu prób: rzuć ostatni błąd
}
