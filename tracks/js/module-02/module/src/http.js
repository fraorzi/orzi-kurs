export class HttpError extends Error {
  // TODO: wywołaj super(`HTTP ${status}`), ustaw name = "HttpError"
  //       i zapisz status jako pole (this.status = status).
}

export async function requestJson(fetchImpl, url, options = {}) {
  // TODO: pobierz JSON z retry, timeoutem i backoffem.
  // options: { retries = 2, backoffMs = 50, timeoutMs = 1000 }
  //  - timeout: opakuj fetchImpl w AbortController; po timeoutMs → controller.abort()
  //    i zawsze czyść timer (finally). fetchImpl wołaj jako fetchImpl(url, { signal }).
  //  - res.ok → zwróć await res.json()
  //  - status 4xx (< 500) → rzuć HttpError NATYCHMIAST (nie ponawiaj)
  //  - status 5xx lub błąd sieci/timeout → ponów do `retries` razy, potem rzuć
  //  - przed każdą kolejną próbą czekaj backoffMs * 2 ** (numer_próby - 1) (backoff wykładniczy)
}
