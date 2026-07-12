export async function fetchWithTimeout(url, ms) {
  // TODO: AbortController + setTimeout(() => controller.abort(), ms)
  //       fetch(url, { signal }); !res.ok -> HTTP <status>
  //       catch: err.name === "AbortError" -> Error("timeout")
  //       finally: clearTimeout
}

export function cancellableFetch(url) {
  // TODO: zwróć { promise, cancel } — cancel() woła controller.abort(),
  //       a promise odrzuca się wtedy z Error("cancelled")
}
